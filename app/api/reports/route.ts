import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const reports = await prisma.report.findMany();
    return NextResponse.json(reports);
  } catch {
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const report = await prisma.report.create({
      data: {
        adminId: body.adminId,
        reportType: body.reportType,
        periodStart: new Date(body.periodStart),
        periodEnd: new Date(body.periodEnd),
        dataJson: JSON.stringify(body.dataJson),
      },
    });

    return NextResponse.json(report);
  } catch {
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }
}
