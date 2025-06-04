import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { CandidateStatus } from '@prisma/client';
import { candidateSchema, candidateFiltersSchema, paginationSchema } from "@/lib/validators";

// GET /api/candidates
export async function GET(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const searchParams = req.nextUrl.searchParams;
    const filters = candidateFiltersSchema.parse({
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") as CandidateStatus || undefined,
      experience: {
        min: searchParams.get("experienceMin") ? Number(searchParams.get("experienceMin")) : undefined,
        max: searchParams.get("experienceMax") ? Number(searchParams.get("experienceMax")) : undefined,
      },
      skills: searchParams.get("skills")?.split(","),
    });

    const pagination = paginationSchema.parse({
      page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: searchParams.get("sortOrder") as "asc" | "desc" || undefined,
    });

    const where: any = {
      deletedAt: null,
    };

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters.status) where.status = filters.status;

    // Experience filter using AND for range
    const and: any[] = [];
    if (typeof filters.experience?.min === 'number') {
      and.push({ experience: { gte: filters.experience.min } });
    }
    if (typeof filters.experience?.max === 'number') {
      and.push({ experience: { lte: filters.experience.max } });
    }
    if (and.length > 0) {
      where.AND = and;
    }

    // Skills filter (relation)
    if (Array.isArray(filters.skills) && filters.skills.length > 0) {
      where.candidateSkills = {
        some: {
          skill: { in: filters.skills }
        }
      };
    }

    const [candidates, total] = await Promise.all([
      prisma.candidate.findMany({
        where,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy: {
          [pagination.sortBy || "createdAt"]: pagination.sortOrder,
        },
        include: {
          candidateSkills: true,
        },
      }),
      prisma.candidate.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: candidates,
      pagination: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        pages: Math.ceil(total / pagination.limit),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

// POST /api/candidates
export async function POST(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const body = await req.json();
    const validatedData = candidateSchema.parse(body);
    // Remove undefined fields
    const createData = Object.fromEntries(
      Object.entries(validatedData).filter(([_, v]) => v !== undefined)
    );

    const candidate = await prisma.candidate.create({
      data: createData,
    });

    return NextResponse.json({ success: true, data: candidate }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating candidate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create candidate" },
      { status: 500 }
    );
  }
} 