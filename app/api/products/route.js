import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        sku: data.sku,
        categoryId: data.categoryId,
        adminId: data.adminId,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}