import pool from "@lib/database";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const product = await request.json();
        const result = await pool.query('UPDATE products SET name = $1, image = $2, unit = $3, base = $4, source = $5, new = $6, reuse = $7 WHERE id = $8 RETURNING *;',
            [product.name, product.image, product.unit, product.base, product.source, product.new, product.reuse, product.id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête UPDATE a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}