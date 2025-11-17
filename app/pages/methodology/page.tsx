"use client";

import { Title } from "@components/Title";
import { TitleType } from "@models/Title";
import { Button } from "@/components/ui-compat/button";
import { Download, Loader } from "lucide-react";
import { useState } from "react";

const page = () => {
  const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);

  const handleDownloadGuideline = async () => {
    setIsDownloadLoading(true);
    setTimeout(() => {
      // Faire télécharger le fichier /public/guideline/Goodwill.pptx
      const a = document.createElement("a");
      a.href =
        "/guideline/Slides méthodologies outil d'impact aménagement VF 2 (240718).pdf";
      a.download = "Méthodologie.pdf";
      a.click();
      a.remove();
      setIsDownloadLoading(false);
    }, 1000);
  };

  const title: TitleType = {
    title: "Méthodologie",
    image: "/icons/methodology.svg",
    number: "",
    back: "/",
    canChange: false,
    id_project: undefined,
  };
  return (
    <div className="flex flex-col items-start w-full gap-10">
      <div className="flex items-center justify-between w-full">
        <Title {...title} />
        <Button
          color="primary"
          variant="bordered"
          startContent={
            isDownloadLoading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              <Download />
            )
          }
          size="lg"
          className="text-lg rounded-lg"
          onClick={() => {
            handleDownloadGuideline();
          }}
        >
          Télécharger
        </Button>
      </div>

      <div className="w-full h-full">
        <iframe
          src="/guideline/Slides méthodologies outil d'impact aménagement VF 2 (240718).pdf"
          className="w-full"
          height={23760}
        ></iframe>
      </div>
    </div>
  );
};

export default page;
