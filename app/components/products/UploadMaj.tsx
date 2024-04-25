"use client";

import Loader from "@components/Loader";
import { useState } from "react";

async function addData(data: JSON) {
  try {
    const parseData = JSON.parse(JSON.stringify(data));
    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseData),
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const updateData = await res.json();
    // const addSection = parseData.Add;
    // addSection.forEach(async (element: any) => {
    //     const res = await fetch('/api/product', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(element)
    //     });
    //     if (!res.ok) throw new Error(await res.text());
    //     const updateData = await res.json();
    // });
    return { success: true, message: "Data added" };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
      const updateData = await res.json();

      if (!updateData.success) {
        setIsLoading(false);
        return "KO: " + updateData.message;
      }
      await addData(updateData.data);
      setIsLoading(false);
      window.location.href = "/pages/products";
    } catch (e) {
      setIsLoading(false);
      alert("ERROR: " + e);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-center ml-auto mr-auto">
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}
