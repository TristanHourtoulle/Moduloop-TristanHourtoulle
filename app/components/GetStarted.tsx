"use client";

import { Button } from "@nextui-org/button";
import { Download, Loader } from "lucide-react";
import { useState } from "react";

export const GetStarted = () => {
  const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);

  const handleDownloadGuideline = async () => {
    setIsDownloadLoading(true);
    setTimeout(() => {
      // Faire télécharger le fichier /public/guideline/Goodwill.pptx
      const a = document.createElement("a");
      a.href = "/guideline/Goodwill.pptx";
      a.download = "Méthodologie.pptx";
      a.click();
      a.remove();
      setIsDownloadLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mx-auto md:mx-0">
      <Button
        color="primary"
        variant="shadow"
        size="lg"
        className="text-lg bg-[#30c1bd]"
        onClick={() => {
          window.location.href = "/pages/projects";
        }}
      >
        Essayer l'outil
      </Button>
      <Button
        color="primary"
        variant="bordered"
        startContent={
          isDownloadLoading ? (
            // <Spinner color="primary" labelColor="foreground" />
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <Download />
          )
        }
        size="lg"
        className="text-lg border-[#30c1bd] text-[#30c1bd] color-[#30c1bd]"
        onClick={() => {
          handleDownloadGuideline();
        }}
      >
        Méthodologie
      </Button>
    </div>
  );
};
