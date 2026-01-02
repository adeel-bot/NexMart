// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getSession } from '../../../../lib/session';
import { cookies } from 'next/headers';
import { Decimal } from '@prisma/client/runtime/client';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(await cookies());

    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { shippingAddress } = body;

    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { customerId: session.id },
      include: {
        items: true, // effectiveUnitPrice is included by default
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Your cart is empty' }, { status: 400 });
    }

    const totalAmount = cart.items.reduce((sum, item) => {
        return sum.add(new Decimal(item.effectiveUnitPrice).mul(item.quantity));
    }, new Decimal(0));

    const order = await prisma.$transaction(async (tx) => {
        // 1. Create the Order
        const newOrder = await tx.order.create({
            data: {
              customerId: session.id,
              shippingAddress: shippingAddress,
              billingAddress: shippingAddress, // Assuming same for simplicity
              totalAmount: totalAmount,
              status: 'PENDING', // Initial order status
              items: {
                create: cart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.effectiveUnitPrice,
                    lineTotal: new Decimal(item.effectiveUnitPrice).mul(item.quantity),
                })),
              },
            },
            include: {
                items: true,
            },
          });
    
        // 2. Clear the user's cart
        await tx.cartItem.deleteMany({
            where: {
                cartId: cart.id,
            },
        });

        // Note: You might not want to delete the cart itself, just its items.
        // If you want to keep the cart for the user's next session:
        // zostawiam to bo nie wiem czy usuniecie koszyka jest dobrym pomyslem
        // await tx.cart.delete({ 
        //     where: {
        //         id: cart.id,
        //     }
        // });

        // 3. Decrement product stock
        for (const item of cart.items) {
            await tx.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }
    
        return newOrder;
      });


    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
