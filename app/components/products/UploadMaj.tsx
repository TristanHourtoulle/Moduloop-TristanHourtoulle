"use client";

import Loader from "@components/Loader";
import { addProductsInDatabase } from "@utils/database/product";
import { useState } from "react";

async function addData(data: any) {
  try {
    console.log("Data in addData", data);

    // Vérifie que les données sont valides
    if (typeof data !== "object") {
      throw new Error("Les données doivent être un objet valide.");
    }

    // Appel à l'API
    const res = await addProductsInDatabase(data);
    console.log("Réponse de l'API :", res);

    return { success: true, message: "Data added" };
  } catch (e: any) {
    console.error("Erreur dans addData :", e.message);
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
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          if (event.target?.result) {
            const jsonContent = JSON.parse(event.target.result as string);
            console.log("Contenu du fichier JSON :", jsonContent);

            // Assurez-vous que jsonContent est un objet valide
            if (typeof jsonContent !== "object") {
              throw new Error("Le contenu du fichier JSON n'est pas valide.");
            }

            // Appel de la fonction pour ajouter des données
            const result = await addData(jsonContent);
            console.log("Résultat de addData :", result);

            if (result.success) {
              console.log("Data added successfully!");
            } else {
              console.error("Erreur :", result.message);
            }
          }
        } catch (error) {
          console.error("Erreur lors de la lecture du fichier JSON :", error);
        }
      };

      reader.onerror = (error) => {
        console.error("Erreur de lecture du fichier :", error);
      };

      reader.readAsText(file);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Erreur : " + error);
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
        <input className="cursor-pointer" type="submit" value="Upload" />
      </form>
    </div>
  );
}
