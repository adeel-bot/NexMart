import { getSession } from "../../../../lib/session";
import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const customer = await prisma.customer.findUnique({
            where: { email },
        });

        if (!customer) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, customer.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const session = await getSession(await cookies());
        session.id = customer.id;
        session.email = customer.email;
        session.name = customer.name;
        session.role = "customer";
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
    }
}