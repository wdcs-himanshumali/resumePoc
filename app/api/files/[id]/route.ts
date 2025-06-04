import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authMiddleware } from "../../middleware/auth";
import { getSignedDownloadUrl, deleteFromS3 } from "@/lib/s3";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const { id } = params;
    const file = await prisma.fileUpload.findUnique({
      where: { id, deletedAt: null },
    });

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }

    // Generate signed URL for download
    const signedUrl = await getSignedDownloadUrl(file.key);

    return NextResponse.json({
      success: true,
      data: {
        url: signedUrl,
        filename: file.originalName,
        mimeType: file.mimeType,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to download file" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;

    const { id } = params;
    const file = await prisma.fileUpload.findUnique({
      where: { id, deletedAt: null },
    });

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }

    // Delete from S3
    await deleteFromS3(file.key);

    // Soft delete in database
    await prisma.fileUpload.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true, message: "File deleted" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete file" },
      { status: 500 }
    );
  }
} 