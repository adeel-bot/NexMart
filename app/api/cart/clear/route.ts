// app/api/cart/clear/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/session";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
    try {
        const session = await getSession(await cookies());

        if (!session.isLoggedIn) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const cart = await prisma.cart.findUnique({
            where: { customerId: session.id },
        });

        if (cart) {
            await prisma.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
        }

        return NextResponse.json({ success: true, message: "Cart cleared" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
    }
}
