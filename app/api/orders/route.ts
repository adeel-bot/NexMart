// /app/api/orders/route.ts
import {prisma} from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = await prisma.order.create({
      data: {
        customerId: body.customerId,
        status: body.status,
        totalAmount: body.totalAmount,
        shippingAddress: body.shippingAddress,
        billingAddress: body.billingAddress,
      },
    });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
