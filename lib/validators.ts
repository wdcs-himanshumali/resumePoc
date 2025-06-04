import { z } from "zod";
import { CandidateStatus, CandidateSource, CandidateStage } from "@prisma/client";

export const candidateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  status: z.nativeEnum(CandidateStatus),
  source: z.nativeEnum(CandidateSource),
  stage: z.nativeEnum(CandidateStage),
  currentCompany: z.string().optional(),
  currentTitle: z.string().optional(),
  experience: z.number().min(0).optional(),
  expectedSalary: z.number().min(0).optional(),
  noticePeriod: z.number().min(0).optional(),
  resumeUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  skills: z.array(z.string()),
  notes: z.string().optional(),
});

export const candidateUpdateSchema = candidateSchema.partial();

export const candidateFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(CandidateStatus).optional(),
  source: z.nativeEnum(CandidateSource).optional(),
  stage: z.nativeEnum(CandidateStage).optional(),
  experience: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
  }).optional(),
  expectedSalary: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
  }).optional(),
  skills: z.array(z.string()).optional(),
  currentCompany: z.string().optional(),
  currentTitle: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const candidateSearchSchema = candidateFiltersSchema.merge(paginationSchema); 