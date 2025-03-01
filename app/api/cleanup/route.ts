import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/lib/prisma";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 10MB" }, { status: 413 });
    }

    // Завантажуємо у S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = `uploads/${Date.now()}-${file.name}`;
    await s3.send(new PutObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: fileKey, Body: buffer, ContentType: file.type }));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    // Зберігаємо в БД
    const savedFile = await prisma.file.create({
      data: { name: file.name, size: file.size, type: file.type, url: fileUrl },
    });

    return NextResponse.json({ success: true, fileId: savedFile.id, url: fileUrl });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
