// app/api/cart/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";
import { cookies } from "next/headers";

export async function POST (req: NextRequest) {
  try {
     const session = await getSession(await cookies());
        
        if (!session.isLoggedIn) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

    const { itemId, quantity } = await req.json();

    if (!itemId || quantity === undefined) {
      return NextResponse.json({ error: "Item ID and quantity are required" }, { status: 400 });
    }

    if (quantity < 1) {
      // If quantity is 0, remove the item
      await prisma.cartItem.delete({
        where: { id: itemId },
      });
      
      return NextResponse.json({
        success: true,
        message: "Item removed from cart",
      });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cart updated",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
};