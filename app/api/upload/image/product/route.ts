import pool from "@lib/database";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

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

    // Charger le fichier sur le Blob Storage de Vercel
    const blob = await put(file.name, file.stream(), {
      access: "public", // L'URL sera publique
    });

    // URL publique du fichier
    const publicUrl = blob.url;

    // Mise à jour de la base de données avec l'URL publique
    const result = await pool.query(
      "UPDATE products SET image = $1 WHERE id = $2 RETURNING *;",
      [publicUrl, idProduct]
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
