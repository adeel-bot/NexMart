import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// GET a single combo by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const combo = await prisma.combo.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!combo) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    return NextResponse.json(combo);
  } catch (error) {
    console.error(`Error fetching combo ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch combo" },
      { status: 500 }
    );
  }
}

// PATCH update a combo by id
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comboId = parseInt(id, 10);
    if (isNaN(comboId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const { name, description, isSaved } = body;

    const data: { name?: string; description?: string; isSaved?: boolean } = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (isSaved !== undefined) data.isSaved = isSaved;

    const updatedCombo = await prisma.combo.update({
      where: { id: comboId },
      data,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(updatedCombo);
  } catch (error) {
    console.error(`Error updating combo ${params}:`, error);
    return NextResponse.json(
      { error: "Failed to update combo" },
      { status: 500 }
    );
  }
}

// DELETE a combo by id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comboId = parseInt(id, 10);
    if (isNaN(comboId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Prisma requires deleting related ComboItem records first if cascading delete is not set up for this relation
    await prisma.comboItem.deleteMany({
      where: { comboId: comboId },
    });
    
    await prisma.combo.delete({
      where: { id: comboId },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting combo ${params}:`, error);
    return NextResponse.json(
      { error: "Failed to delete combo" },
      { status: 500 }
    );
  }
}
