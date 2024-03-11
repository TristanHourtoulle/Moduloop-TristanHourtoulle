// Importez les types NextApiRequest et NextApiResponse
import pool from '@/lib/database';
import { NextRequest } from 'next/server';
import { ProductType } from '@models/Product';
import { User } from '@/models/User';

// Fonction pour gérer les requêtes POST
export async function POST(request: NextRequest) {
    try {
        const product: any = await request.json();

        const result = await pool.query("INSERT INTO products (name, image, unit, base, source, new, reuse) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
                                        [product.name, product.image, product.unit, product.category, "", product.new, product.reuse])

        if (result.rowCount == 1) {
            const data = result.rows[0];
            return Response.json({success: true, data}, {status: 200});
        } else {
            throw new Error('La requête INSERT a échoué')
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

        const result = await pool.query('SELECT * FROM products WHERE id = $1;', [id]);
        if (result.rowCount == 1) {
            const product = result.rows[0];
            return Response.json({success: true, product}, { status: 200 })
        } else {
            return Response.json({success: false, message: 'No product found'}, { status: 404 });
        }
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
