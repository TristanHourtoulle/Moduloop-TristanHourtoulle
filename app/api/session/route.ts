import { getSession } from "@lib/session";
import { NextRequest } from "next/server";

export default async function POST(request: NextRequest) {
    const session = await getSession();
    return Response.json({ success: true, session}, { status: 200 });
}

export async function GET(request: NextRequest) {
    const session = await getSession();
    return Response.json({ success: true, session}, { status: 200 });
}

export async function PUT(request: NextRequest) {
    const session = await getSession();
    return Response.json({ success: true, session}, { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const session = await getSession();
    return Response.json({ success: true, session}, { status: 200 });
}

