// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";
import { cookies } from "next/headers";
import { Prisma } from "../../../generated/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(await cookies());
    
    if (!session.isLoggedIn || session.role !== 'customer') {
      return NextResponse.json({ error: "Not authenticated as a customer" }, { status: 401 });
    }

    const { productId, comboId, quantity = 1 } = await req.json();

    if (!productId && !comboId) {
      return NextResponse.json({ error: "Product ID or Combo ID is required" }, { status: 400 });
    }

    // Find or create cart for user
    let cart = await prisma.cart.findUnique({
      where: { customerId: session.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { customerId: session.id },
      });
    }

    if (productId && !comboId) {
      // Handle single product
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: productId,
          comboId: null, // Ensure we are looking for a single product, not part of a combo
        },
      });

      const effectiveUnitPrice = product.price;

      if (existingItem) {
        const updatedItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
        return NextResponse.json({ success: true, message: "Item quantity updated", item: updatedItem });
      } else {
        const newItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            effectiveUnitPrice: effectiveUnitPrice,
            comboId: null,
          },
        });
        return NextResponse.json({ success: true, message: "Item added to cart", item: newItem });
      }
    } else if (comboId) {
      // Handle combo
      const combo = await prisma.combo.findUnique({
        where: { id: comboId },
        include: { 
          items: {
            include: {
              product: true
            }
          } 
        },
      });

      if (!combo) {
        return NextResponse.json({ error: "Combo not found" }, { status: 404 });
      }
      
      const totalRegularPrice = combo.items.reduce((sum, item) => {
        return sum.add(new Prisma.Decimal(item.product.price).mul(item.quantity));
      }, new Prisma.Decimal(0));

      const discountRatio = totalRegularPrice.isZero()
        ? new Prisma.Decimal(1)
        : new Prisma.Decimal(combo.price).dividedBy(totalRegularPrice);

      for (const comboItem of combo.items) {
        const existingItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: comboItem.productId,
            comboId: combo.id,
          },
        });
        
        const effectiveUnitPrice = new Prisma.Decimal(comboItem.product.price).mul(discountRatio);

        if (existingItem) {
          await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + (comboItem.quantity * quantity) },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: comboItem.productId,
              quantity: comboItem.quantity * quantity,
              effectiveUnitPrice: effectiveUnitPrice,
              comboId: combo.id,
            },
          });
        }
      }
      return NextResponse.json({ success: true, message: "Combo added to cart" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}