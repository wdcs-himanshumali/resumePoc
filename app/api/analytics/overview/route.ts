import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../middleware/auth';

// GET /api/analytics/overview
export async function GET(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const [candidates, interviews, emails] = await Promise.all([
      prisma.candidate.count({ where: { deletedAt: null } }),
      prisma.interview.count({ where: { deletedAt: null } }),
      prisma.emailLog.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        candidates,
        interviews,
        emails,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
  }
} 