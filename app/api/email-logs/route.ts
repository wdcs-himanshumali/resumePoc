import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { EmailStatus } from '@prisma/client';

const createLogSchema = z.object({
  templateId: z.string().min(1),
  senderId: z.string().min(1),
  recipientId: z.string().min(1),
  subject: z.string().min(1),
  content: z.string().min(1),
  status: z.nativeEnum(EmailStatus).optional(),
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  openedAt: z.string().datetime().optional(),
  errorMessage: z.string().optional(),
});

const querySchema = z.object({
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
  recipientId: z.string().optional(),
  senderId: z.string().optional(),
  status: z.nativeEnum(EmailStatus).optional(),
});

// GET /api/email-logs
export async function GET(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const searchParams = req.nextUrl.searchParams;
    const query = querySchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      recipientId: searchParams.get('recipientId'),
      senderId: searchParams.get('senderId'),
      status: searchParams.get('status'),
    });

    const where = {
      ...(query.recipientId && { recipientId: query.recipientId }),
      ...(query.senderId && { senderId: query.senderId }),
      ...(query.status && { status: query.status }),
    };

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.emailLog.findMany({
        where,
        include: {
          template: { select: { id: true, name: true } },
          sender: { select: { id: true, name: true, email: true } },
          recipient: { select: { id: true, name: true, email: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.emailLog.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: logs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching email logs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch email logs' }, { status: 500 });
  }
}

// POST /api/email-logs
export async function POST(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const body = await req.json();
    const data = createLogSchema.parse(body);

    const log = await prisma.emailLog.create({
      data: {
        templateId: data.templateId,
        senderId: data.senderId,
        recipientId: data.recipientId,
        subject: data.subject,
        content: data.content,
        status: data.status || 'DRAFT',
        sentAt: data.sentAt ? new Date(data.sentAt) : undefined,
        deliveredAt: data.deliveredAt ? new Date(data.deliveredAt) : undefined,
        openedAt: data.openedAt ? new Date(data.openedAt) : undefined,
        errorMessage: data.errorMessage,
      },
      include: {
        template: { select: { id: true, name: true } },
        sender: { select: { id: true, name: true, email: true } },
        recipient: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, data: log }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Error creating email log:', error);
    return NextResponse.json({ success: false, error: 'Failed to create email log' }, { status: 500 });
  }
} 