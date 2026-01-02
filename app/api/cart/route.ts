// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/session";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(await cookies());
    
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const cart = await prisma.cart.findUnique({
      where: { customerId: session.id },
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
            combo: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [], total: 0, subtotal: 0 }, { status: 200 });
    }

    let subtotal = 0;

    for (const item of cart.items) {
      subtotal += Number(item.effectiveUnitPrice) * item.quantity;
    }

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
}