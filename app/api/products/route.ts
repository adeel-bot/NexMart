// /app/api/products/route.ts
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    let productOrProducts;
    if (id) {
      // Fetch single product by ID
      productOrProducts = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
          category: {
            select: {
              name: true,  // Only fetch the name to match your frontend interface
            },
          },
        },
      });

      if (!productOrProducts) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
    } else {
      // Fetch all products
      productOrProducts = await prisma.product.findMany({
        include: {
          category: {
            select: {
              name: true,  // Only fetch the name to match your frontend interface
            },
          },
        },
      });
    }

    return NextResponse.json(productOrProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        sku: body.sku,
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
        adminId: body.adminId,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}