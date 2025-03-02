import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if(!id) {
        return NextResponse.json({ error: 'File id not specified' }, { status: 400 })
    }

    const file = await prisma.file.findUnique({ where: { id } });

    if(!file) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return new Response(file.data, {
        headers: {
            "Content-Type": file.type,
            "Content-Disposition": `attachment; filename="${file.name}"`,
        }
    })
}