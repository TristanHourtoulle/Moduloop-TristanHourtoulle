"use client"

import { ProductType } from "@models/Product";
import { useState } from "react";


async function addData(data: JSON) {
    try {
        const parseData = JSON.parse(data);
        const addSection = parseData.Add;
        addSection.forEach(async (element: any) => {
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(element)
            });
            if (!res.ok) throw new Error(await res.text());
            const updateData = await res.json();
        });
        return { success: true, message: "Data added" };
    } catch (e: any) {
        return { success: false, message: e.message };
    }
}

export default function UploadForm() {
    const [file, setFile] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
            if (!res.ok) throw new Error(await res.text())
            const updateData = await res.json();

            if (!updateData.success) {
                return ("KO: " + updateData.message);
            }
            addData(updateData.data);
        } catch (e) {
            console.log("ERROR: ", e)
            alert("ERROR: " + e)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type='file'
                name='file'
                onChange={(e) => setFile(e.target.files?.[0])}
            />
            <input
                type="submit"
                value="Upload"
            />
        </form>
    )
}