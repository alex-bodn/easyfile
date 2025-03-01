import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type FileResponse = {
    id: string;
    name: string;
    type: string;
    data: Uint8Array;
    createdAt: Date;
  }

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;

    if(!id) {
        return NextResponse.json({ error: 'File id not specified' }, { status: 400 })
    }

    const file: FileResponse | null = await prisma.file.findUnique({ where: { id } });

    if(!file) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {
        id: file.id,
        name: file.name,
        size: file.data.length,
        type: file.type,
        createdAt: file.createdAt
    }});
}