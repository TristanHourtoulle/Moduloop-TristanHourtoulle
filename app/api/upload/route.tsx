import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextResponse) {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file)
        return Response.json({success: false, data: "no file"}, {status: 500});

    const fileBlob = await file.arrayBuffer();
    const buffer = Buffer.from(fileBlob);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, file.name);
    await writeFile(filepath, buffer);
    console.log(`open ${path} to see the uploaded file.`);

    return Response.json({success: true, data: filepath}, {status: 200});
}