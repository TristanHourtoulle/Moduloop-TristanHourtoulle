import { NextResponse, NextRequest } from 'next/server';
import pool  from '@/lib/database';

export async function PUT(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id') || '';
        const description = searchParams.get('description') || '';
        console.log("Params received: ", id, description)

        const result = await pool.query('UPDATE projects SET description = $1 WHERE id = $2 RETURNING *;',
            [description, id]);

        // Vérification si la requête a réussi
        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête UPDATE sur la table project a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        return Response.json({ success: false, error}, { status: 500 });
    }
}