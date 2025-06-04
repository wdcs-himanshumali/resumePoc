import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../middleware/auth';

// GET /api/analytics/trends
export async function GET(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    // Example: count new candidates and interviews per month for the last 6 months
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1 };
    }).reverse();

    const candidateCounts = await Promise.all(
      months.map(({ year, month }) =>
        prisma.candidate.count({
          where: {
            createdAt: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
            deletedAt: null,
          },
        })
      )
    );
    const interviewCounts = await Promise.all(
      months.map(({ year, month }) =>
        prisma.interview.count({
          where: {
            createdAt: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
            deletedAt: null,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      data: months.map((m, i) => ({
        year: m.year,
        month: m.month,
        candidates: candidateCounts[i],
        interviews: interviewCounts[i],
      })),
    });
  } catch (error) {
    console.error('Error fetching analytics trends:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics trends' }, { status: 500 });
  }
} 