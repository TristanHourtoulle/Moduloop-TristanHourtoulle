// Importez les types NextApiRequest et NextApiResponse
import pool from "@/lib/database";
import { NextRequest } from "next/server";
import { ProductType } from "@models/Product";
import { User } from "@/models/User";

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
  try {
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
  try {
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest) {
  try {
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
