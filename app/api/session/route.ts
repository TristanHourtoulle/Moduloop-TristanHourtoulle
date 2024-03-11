import { getSession } from "@lib/session";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getSession();
    return Response.json({ success: true, session}, { status: 200 });
}

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        return Response.json({ success: true, session}, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, error}, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const session = await getSession();
    return Response.json({ success: true, session}, { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const session = await getSession();
    return Response.json({ success: true, session}, { status: 200 });
}

