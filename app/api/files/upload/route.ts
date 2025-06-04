import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../middleware/auth';
import { validateFile, generateUniqueFilename, sanitizeFilename } from '@/lib/file-utils';
import { uploadToS3 } from '@/lib/s3';

const uploadSchema = z.object({
  candidateId: z.string().optional(),
  type: z.enum(["RESUME", "DOCUMENT"]),
});

// POST /api/files/upload
export async function POST(req: NextRequest) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const metadata = JSON.parse(formData.get("metadata") as string);

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Validate metadata
    const { candidateId, type } = uploadSchema.parse(metadata);

    // Generate unique filename and key
    const originalName = sanitizeFilename(file.name);
    const filename = generateUniqueFilename(originalName);
    const key = `uploads/${type.toLowerCase()}/${filename}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to S3
    const url = await uploadToS3(buffer, key, file.type);

    // Create database record
    const fileRecord = await prisma.fileUpload.create({
      data: {
        filename,
        originalName,
        mimeType: file.type,
        size: file.size,
        url,
        key,
        candidateId,
        type,
      },
    });

    return NextResponse.json(
      { success: true, data: fileRecord },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
} 