import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { candidateUpdateSchema } from "@/lib/validators";
import { authMiddleware } from "../../middleware/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const { id } = params;
    const candidate = await prisma.candidate.findUnique({
      where: { id, deletedAt: null },
      include: {
        interviews: {
          select: {
            id: true,
            date: true,
            status: true,
            type: true,
            format: true,
          },
          orderBy: { date: "desc" },
        },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: candidate });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch candidate" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const { id } = params;
    const body = await req.json();
    const data = candidateUpdateSchema.parse(body);
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const candidate = await prisma.candidate.update({
      where: { id, deletedAt: null },
      data: updateData,
      include: {
        interviews: {
          select: {
            id: true,
            date: true,
            status: true,
            type: true,
            format: true,
          },
          orderBy: { date: "desc" },
        },
      },
    });

    return NextResponse.json({ success: true, data: candidate });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating candidate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update candidate" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const { id } = params;
    await prisma.candidate.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true, message: "Candidate deleted" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete candidate" },
      { status: 500 }
    );
  }
} 