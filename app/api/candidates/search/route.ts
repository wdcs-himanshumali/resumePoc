import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { candidateSearchSchema } from "@/lib/validators";
import { authMiddleware } from "../../middleware/auth";
import { z } from "zod";

// POST /api/candidates/search
export async function POST(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const body = await req.json();
    const { search, filters, pagination } = candidateSearchSchema.parse(body);

    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { currentCompany: { contains: search, mode: "insensitive" } },
        { currentTitle: { contains: search, mode: "insensitive" } },
        { notes: { contains: search, mode: "insensitive" } },
      ];
    }

    if (filters?.status) where.status = filters.status;
    if (filters?.source) where.source = filters.source;
    if (filters?.stage) where.stage = filters.stage;
    if (filters?.experience) {
      where.experience = {
        ...(filters.experience.min && { gte: filters.experience.min }),
        ...(filters.experience.max && { lte: filters.experience.max }),
      };
    }
    if (filters?.expectedSalary) {
      where.expectedSalary = {
        ...(filters.expectedSalary.min && { gte: filters.expectedSalary.min }),
        ...(filters.expectedSalary.max && { lte: filters.expectedSalary.max }),
      };
    }
    if (filters?.skills) {
      where.skills = {
        hasSome: filters.skills,
      };
    }
    if (filters?.currentCompany) {
      where.currentCompany = { contains: filters.currentCompany, mode: "insensitive" };
    }
    if (filters?.currentTitle) {
      where.currentTitle = { contains: filters.currentTitle, mode: "insensitive" };
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

    console.error("Error searching candidates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search candidates" },
      { status: 500 }
    );
  }
} 