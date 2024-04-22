// Importez les types NextApiRequest et NextApiResponse
import pool from "@/lib/database";
import { login } from "@/lib/session";
import { User } from "@/models/User";
import { NextRequest } from "next/server";

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
  try {
    const user: User = await request.json();
    const result = await pool.query(
      'INSERT INTO users ("firstName", "name", "email", "password", "role", "createdAt", "updatedAt", "avatar") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
      [
        user.firstName,
        user.name,
        user.email,
        user.password,
        user.role,
        user.createdAt,
        user.updatedAt,
        user.avatar,
      ]
    );

    // Vérification si la requête a réussi
    if (result.rowCount === 1) {
      const data = result.rows[0]; // Nouvel utilisateur ajouté
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête INSERT a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes GET
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email") || "";
    const password = searchParams.get("password") || "";

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2;",
      [email, password]
    );

    // Vérification si l'utilisateur a été trouvé dans la base de données
    if (result.rowCount === 1) {
      const user = result.rows[0];
      const newUser: User = {
        id: user.id,
        firstName: user.firstName,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatar: user.avatar,
      };
      await login(newUser);
      return Response.json({ success: true, data: user }, { status: 200 });
    } else {
      throw new Error(
        "L'utilisateur n'a pas été trouvé dans la base de données"
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
  try {
    const user: User = await request.json();
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *;",
      [user.name, user.email, user.password, user.role, user.id]
    );

    // Vérification si la requête a réussi
    if (result.rowCount === 1) {
      const data = result.rows[0];
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête UPDATE a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest) {
  try {
    const user: User = await request.json();
    const result = await pool.query("DELETE FROM users WHERE id = $1;", [
      user.id,
    ]);

    // Vérification si la requête a réussi
    if (result.rowCount === 1) {
      const data = result.rows[0];
      return Response.json({ success: true, data }, { status: 200 });
    } else {
      throw new Error("La requête DELETE a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
