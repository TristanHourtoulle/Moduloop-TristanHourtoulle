import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // const data = await request.formData();
  // const file = data.get('file') as File;

  // if (!file)
  //     return Response.json({success: false, data: "no file"}, {status: 500});

  // const fileBlob = await file.arrayBuffer();
  // const buffer = Buffer.from(fileBlob);

  // const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  // await mkdir(uploadDir, { recursive: true });
  // const filepath = path.join(uploadDir, file.name);
  // await writeFile(filepath, buffer);

  // const fileData = await readFile(filepath, 'utf-8');

  return Response.json({ success: true, data: null }, { status: 200 });
}
