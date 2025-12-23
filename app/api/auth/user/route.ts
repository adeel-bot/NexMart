import { getSession } from "../../../../lib/session";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession(await cookies());

        if (session.isLoggedIn) {
            return NextResponse.json({ user: {
                id: session.id,
                email: session.email,
                name: session.name,
                role: session.role,
                isLoggedIn: session.isLoggedIn,
            } });
        } else {
            return NextResponse.json({ user: null });
        }
    } catch (error) {
        console.error("Error getting user session:", error);
        return NextResponse.json({ error: "Failed to get user session" }, { status: 500 });
    }
}