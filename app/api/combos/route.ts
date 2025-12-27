import { prisma } from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET combos, optionally filtered by customerId
export async function GET(request: NextRequest) {
  try {
    const customerId = request.nextUrl.searchParams.get("customerId");
    const findOptions = {
      where: customerId ? { customerId: parseInt(customerId, 10) } : {},
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    };

    const combos = await prisma.combo.findMany(findOptions);
    return NextResponse.json(combos);
  } catch (error) {
    console.error("Error fetching combos:", error);
    return NextResponse.json(
      { error: "Failed to fetch combos" },
      { status: 500 }
    );
  }
}

// POST a new combo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, name, description, items, isSaved } = body;

    if (!customerId || !name || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: customerId, name, and at least one item." },
        { status: 400 }
      );
    }

    let totalPrice = 0;
    for (const item of items) {
        const product = await prisma.product.findUnique({ where: { id: item.productId } });
        if (!product) {
            return NextResponse.json({ error: `Product with id ${item.productId} not found`}, {status: 404});
        }
        totalPrice += Number(product.price) * item.quantity;
    }

    const newCombo = await prisma.combo.create({
      data: {
        name,
        description,
        customerId,
        isSaved: isSaved || false,
        totalPrice: totalPrice,
        items: {
          create: items.map((item: { productId: number; quantity: number, unitPrice: number }) => ({
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            product: { connect: { id: item.productId } },
          })),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(newCombo, { status: 201 });
  } catch (error) {
    console.error("Error creating combo:", error);
    return NextResponse.json(
      { error: "Failed to create combo" },
      { status: 500 }
    );
  }
}
