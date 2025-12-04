// /app/api/categories/route.ts

import {prisma} from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
        adminId: body.adminId,
      },
    });
    return NextResponse.json(category);
  } catch (e) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
