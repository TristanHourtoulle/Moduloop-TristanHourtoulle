import { writeFile, mkdir, readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import pool from "@lib/database";

export async function POST(request: NextResponse) {
    try {
        // Save the file to the public/products directory
        const data = await request.formData();
        const file = data.get('file') as File;
        const idProduct = data.get('productId') as string;

        if (!file)
            return Response.json({success: false, data: "no file"}, {status: 500});

        const fileBlob = await file.arrayBuffer();
        const buffer = Buffer.from(fileBlob);

        const uploadDir = path.join(process.cwd(), 'public', 'products');
        await mkdir(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, file.name);
        await writeFile(filepath, buffer);
        console.log(`open ${path} to see the uploaded file.`);
        console.log('idProduct:', idProduct);
        // store the filepath of image in the database products
        const dbFilePath = filepath.replace(process.cwd(), '').replace(/\\/g, '/');
        const dbImageUrl = dbFilePath.replace('/public', '');
        const result = await pool.query('UPDATE products SET image = $1 WHERE id = $2 RETURNING *;', [dbImageUrl, idProduct]);

        if (result.rowCount === 1) {
            const data = result.rows[0];
            return Response.json({ success: true, data}, { status: 200 });
        } else {
            throw new Error('La requête UPDATE a échoué');
        }
    } catch (error) {
        console.error(error);
        return Response.json({success: false, data: error}, {status: 500});
    }
}