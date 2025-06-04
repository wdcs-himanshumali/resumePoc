import { CandidateStatus, CandidateSource, CandidateStage } from "@prisma/client";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: CandidateStatus;
  source: CandidateSource;
  stage: CandidateStage;
  currentCompany?: string;
  currentTitle?: string;
  experience?: number;
  expectedSalary?: number;
  noticePeriod?: number;
  resumeUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CandidateFilters {
  search?: string;
  status?: CandidateStatus;
  source?: CandidateSource;
  stage?: CandidateStage;
  experience?: {
    min?: number;
    max?: number;
  };
  expectedSalary?: {
    min?: number;
    max?: number;
  };
  skills?: string[];
  currentCompany?: string;
  currentTitle?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: keyof Candidate;
  sortOrder?: "asc" | "desc";
}

export interface CandidateSearchParams extends CandidateFilters, PaginationParams {}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  key: string;
  candidateId?: string;
  type: "RESUME" | "DOCUMENT";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface FileUploadResponse {
  success: boolean;
  data?: FileUpload;
  error?: string;
  details?: any;
}

export interface FileDownloadResponse {
  success: boolean;
  data?: {
    url: string;
    filename: string;
    mimeType: string;
  };
  error?: string;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
} 