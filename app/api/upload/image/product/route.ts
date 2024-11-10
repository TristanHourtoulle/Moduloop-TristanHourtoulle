import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import pool from "@lib/database";

export async function POST(request: NextRequest) {
  try {
    // Récupérer les données de la requête
    const data = await request.formData();
    const file = data.get("file") as File;
    const idProduct = data.get("productId") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, data: "No file provided" },
        { status: 400 }
      );
    }
    if (!idProduct) {
      return NextResponse.json(
        { success: false, data: "No product ID provided" },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const fileBlob = await file.arrayBuffer();
    const buffer = Buffer.from(fileBlob);

    // Définir le chemin de sauvegarde
    const uploadDir = path.join(process.cwd(), "public", "products");
    await mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, file.name);
    await writeFile(filepath, new Uint8Array(buffer));

    // Construire le chemin pour la base de données
    const dbFilePath = filepath.replace(process.cwd(), "").replace(/\\/g, "/");
    const dbImageUrl = dbFilePath.replace("/public", "");

    // Mise à jour de la base de données
    const result = await pool.query(
      "UPDATE products SET image = $1 WHERE id = $2 RETURNING *;",
      [dbImageUrl, idProduct]
    );

    if (result.rowCount === 1) {
      const data = result.rows[0];
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête UPDATE a échoué");
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        data: (error as Error).message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
