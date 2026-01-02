import { prisma } from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET all combos
export async function GET(request: NextRequest) {
  try {
    const combos = await prisma.combo.findMany({
      include: {
        admin: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
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
    const { name, description, price, isActive, adminId, items } = body;

    if (!name || !price || !adminId || !items || !items.create || items.create.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, adminId, and at least one item." },
        { status: 400 }
      );
    }

    const newCombo = await prisma.combo.create({
      data: {
        name,
        description,
        price,
        isActive,
        adminId,
        items,
      },
      include: {
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
    // Check for Prisma-specific errors if needed
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
       return NextResponse.json({ error: "One or more products not found." }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to create combo" },
      { status: 500 }
    );
  }
}
