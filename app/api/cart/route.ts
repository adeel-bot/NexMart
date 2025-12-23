// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma";
import { withSession } from "../../../lib/session";

export const GET = withSession(async (req: any) => {
  try {
    const user = req.session.get("user");
    
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const cart = await prisma.cart.findUnique({
      where: { customerId: user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [], total: 0, subtotal: 0 }, { status: 200 });
    }

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + (Number(item.product.price) * item.quantity);
    }, 0);

    const total = subtotal; // Add tax/shipping if needed

    return NextResponse.json({
      items: cart.items,
      total,
      subtotal,
      cartId: cart.id,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
});