import pool from "@lib/database";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // Save the file to the public/products directory
    const data = await request.formData();
    const file = data.get("file") as File;
    const idProduct = data.get("productId") as string;

    if (!file)
      return Response.json(
        { success: false, data: "no file" },
        { status: 500 }
      );

    const fileBlob = await file.arrayBuffer();
    const buffer = Buffer.from(fileBlob);

    const uploadDir = path.join(process.cwd(), "public", "products");
    await mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, file.name);
    await writeFile(filepath, buffer);
    // store the filepath of image in the database products
    const dbFilePath = filepath.replace(process.cwd(), "").replace(/\\/g, "/");
    const dbImageUrl = dbFilePath.replace("/public", "");
    if (!idProduct)
      return Response.json(
        { success: false, data: "no product id" },
        { status: 500 }
      );
    const result = await pool.query(
      "UPDATE products SET image = $1 WHERE id = $2 RETURNING *;",
      [dbImageUrl, idProduct]
    );

    if (result.rowCount === 1) {
      const data = result.rows[0];
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête UPDATE a échoué");
    }
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, data: error }, { status: 500 });
  }
}
