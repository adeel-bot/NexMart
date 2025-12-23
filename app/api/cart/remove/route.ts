// app/api/cart/remove/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";
import { cookies } from "next/headers";

export async function DELETE (req: NextRequest){
  try {
    const session = await getSession(await cookies());

       if (!session.isLoggedIn) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        } 

    const { itemId } = await req.json();

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 });
  }
};