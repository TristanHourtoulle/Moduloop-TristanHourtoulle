"use client";

import { Title } from "@components/Title";
import UploadForm from "@components/products/UploadMaj";
import { TitleType } from "@models/Title";
import { toast } from "sonner";

export default function page() {
  const title: TitleType = {
    title: "Mettre à jour vos produits",
    image: "/icons/close.svg",
    number: null,
    back: "/pages/products",
    canChange: false,
    id_project: undefined,
  };

  const handleDownloadTutoriel = async () => {
    toast.warning("Tutoriel non disponible pour le moment");
  };

  return (
    <div>
      <Title {...title} />

      <div className="flex flex-col items-center add-product-card ml-auto mr-auto mt-10 rounded-lg">
        <div className="flex flex-col items-center tutoriel">
          <p>
            Pour mettre à jour vos produits, veuillez vous référer à ce
            tutoriel:
          </p>
          <button type="button" onClick={handleDownloadTutoriel}>
            Tutoriel
          </button>
        </div>

        <div className="flex flex-col items-center upload">
          <p>Ensuite, uploader votre fichier ici:</p>
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
