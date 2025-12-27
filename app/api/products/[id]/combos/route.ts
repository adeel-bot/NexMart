import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const combos = await prisma.combo.findMany({
      where: {
        items: {
          some: {
            productId: productId,
          },
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

    return NextResponse.json(combos);
  } catch (error) {
    console.error(`Error fetching combos for product ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch combos for product" },
      { status: 500 }
    );
  }
}
