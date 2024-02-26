// Importez les types NextApiRequest et NextApiResponse
import pool from '@/lib/database';
import { NextRequest } from 'next/server';
import { ProductType } from '@models/Product';
import { User } from '@/models/User';

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
    try {
        const user: User = await request.json();
        const result = await pool.query('INSERT INTO users ("firstName", "name", "email", "password", "role", "createdAt", "updatedAt", "avatar") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
                                        [user.firstName, user.name, user.email, user.password, user.role, user.createdAt, user.updatedAt, user.avatar]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0]; // Nouvel utilisateur ajouté
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête INSERT a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}

// Fonction pour gérer les requêtes GET
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id') || '';
        console.log("ID: ", id);

        const product: ProductType = {
                id: 1,
                name: "Etagère",
                image: "/products/etagere.png",
                unit: "pièce",
                base: "Impact",
                nrc_manufacturing: 1,
                nrc_installation: 1,
                nrc_usage: 1,
                nrc_end_of_life: 1,
                nerf_manufacturing: 1,
                nerf_installation: 1,
                nerf_usage: 1,
                nerf_end_of_life: 1,
                nase_manufacturing: 1,
                nase_installation: 1,
                nase_usage: 1,
                nase_end_of_life: 1,
                nem_manufacturing: 1,
                nem_installation: 1,
                nem_usage: 1,
                nem_end_of_life: 1,
                rrc_manufacturing: 65,
                rrc_installation: 65,
                rrc_usage: 65,
                rrc_end_of_life: 65,
                rerf_manufacturing: 65,
                rerf_installation: 65,
                rerf_usage: 65,
                rerf_end_of_life: 65,
                rase_manufacturing: 65,
                rase_installation: 65,
                rase_usage: 65,
                rase_end_of_life: 65,
                rem_manufacturing: 65,
                rem_installation: 65,
                rem_usage: 65,
                rem_end_of_life: 65
            }
        return Response.json({success: true, product}, { status: 200 })
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        return Response.json({ success: false, error }, { status: 500 });
    }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest) {
    try {
        const user: User = await request.json();
        const result = await pool.query('UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *;',
            [user.name, user.email, user.password, user.role, user.id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête UPDATE a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request: NextRequest) {
    try {
        const user: User = await request.json();
        const result = await pool.query('DELETE FROM users WHERE id = $1;', [user.id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête DELETE a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}
