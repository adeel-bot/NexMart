// /app/api/customers/route.ts
import {prisma} from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prisma.customer.findMany({
      include: { orders: true , Cart: true},
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}


