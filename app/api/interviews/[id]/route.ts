import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../middleware/auth';
import { InterviewType, InterviewFormat, InterviewStatus } from '@prisma/client';

const updateInterviewSchema = z.object({
  date: z.string().datetime().optional(),
  duration: z.number().min(1).optional(),
  type: z.nativeEnum(InterviewType).optional(),
  format: z.nativeEnum(InterviewFormat).optional(),
  location: z.string().optional(),
  status: z.nativeEnum(InterviewStatus).optional(),
  notes: z.string().optional(),
  feedback: z.string().optional(),
});

// GET /api/interviews/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
    const { id } = params;
    const interview = await prisma.interview.findUnique({
      where: { id, deletedAt: null },
      include: {
        candidate: { select: { id: true, name: true, email: true } },
        interviewer: { select: { id: true, name: true, email: true } },
      },
    });
    if (!interview) {
      return NextResponse.json({ success: false, error: 'Interview not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: interview });
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch interview' }, { status: 500 });
  }
}

// PUT /api/interviews/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
    const { id } = params;
    const body = await req.json();
    const data = updateInterviewSchema.parse(body);
    // Prepare update data
    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }
    const interview = await prisma.interview.update({
      where: { id, deletedAt: null },
      data: updateData,
      include: {
        candidate: { select: { id: true, name: true, email: true } },
        interviewer: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json({ success: true, data: interview });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Error updating interview:', error);
    return NextResponse.json({ success: false, error: 'Failed to update interview' }, { status: 500 });
  }
}

// DELETE /api/interviews/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
    const { id } = params;
    await prisma.interview.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ success: true, message: 'Interview deleted' });
  } catch (error) {
    console.error('Error deleting interview:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete interview' }, { status: 500 });
  }
} 