import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../middleware/auth';

const updateTemplateSchema = z.object({
  name: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

// GET /api/email-templates/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
    const { id } = params;
    const template = await prisma.emailTemplate.findUnique({
      where: { id, deletedAt: null },
    });
    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch template' }, { status: 500 });
  }
}

// PUT /api/email-templates/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
    const { id } = params;
    const body = await req.json();
    const data = updateTemplateSchema.parse(body);
    const template = await prisma.emailTemplate.update({
      where: { id, deletedAt: null },
      data,
    });
    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Error updating template:', error);
    return NextResponse.json({ success: false, error: 'Failed to update template' }, { status: 500 });
  }
}

// DELETE /api/email-templates/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
    const { id } = params;
    await prisma.emailTemplate.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ success: true, message: 'Template deleted' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete template' }, { status: 500 });
  }
} 