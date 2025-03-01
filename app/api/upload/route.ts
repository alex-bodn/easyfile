import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
  
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
  
    const buffer = Buffer.from(await file.arrayBuffer());
  
    const savedFile = await prisma.file.create({
      data: {
        name: file.name,
        type: file.type,
        data: buffer,
      },
    });

    return NextResponse.json({ success: true, fileId: savedFile.id });
}