import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { InterviewType, InterviewFormat, InterviewStatus } from '@prisma/client';

const createInterviewSchema = z.object({
  candidateId: z.string().min(1),
  interviewerId: z.string().min(1),
  date: z.string().datetime(),
  duration: z.number().min(1),
  type: z.nativeEnum(InterviewType),
  format: z.nativeEnum(InterviewFormat),
  location: z.string().optional(),
  status: z.nativeEnum(InterviewStatus).optional(),
  notes: z.string().optional(),
  feedback: z.string().optional(),
});

const querySchema = z.object({
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
  candidateId: z.string().optional(),
  interviewerId: z.string().optional(),
  status: z.nativeEnum(InterviewStatus).optional(),
});

// GET /api/interviews
export async function GET(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const searchParams = req.nextUrl.searchParams;
    const query = querySchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      candidateId: searchParams.get('candidateId'),
      interviewerId: searchParams.get('interviewerId'),
      status: searchParams.get('status'),
    });

    const where = {
      deletedAt: null,
      ...(query.candidateId && { candidateId: query.candidateId }),
      ...(query.interviewerId && { interviewerId: query.interviewerId }),
      ...(query.status && { status: query.status }),
    };

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      prisma.interview.findMany({
        where,
        include: {
          candidate: { select: { id: true, name: true, email: true } },
          interviewer: { select: { id: true, name: true, email: true } },
        },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      prisma.interview.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: interviews,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch interviews' }, { status: 500 });
  }
}

// POST /api/interviews
export async function POST(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const body = await req.json();
    const data = createInterviewSchema.parse(body);

    const interview = await prisma.interview.create({
      data: {
        candidateId: data.candidateId,
        interviewerId: data.interviewerId,
        date: new Date(data.date),
        duration: data.duration,
        type: data.type,
        format: data.format,
        location: data.location,
        status: data.status || 'SCHEDULED',
        notes: data.notes,
        feedback: data.feedback,
      },
      include: {
        candidate: { select: { id: true, name: true, email: true } },
        interviewer: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, data: interview }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Error creating interview:', error);
    return NextResponse.json({ success: false, error: 'Failed to create interview' }, { status: 500 });
  }
} 