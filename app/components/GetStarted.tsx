"use client";

import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { ChevronRight } from "lucide-react";

export const GetStarted = () => {
  // const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);

  // const handleDownloadGuideline = async () => {
  //   setIsDownloadLoading(true);
  //   setTimeout(() => {
  //     // Faire télécharger le fichier /public/guideline/Goodwill.pptx
  //     const a = document.createElement("a");
  //     a.href =
  //       "/guideline/Slides méthodologies outil d'impact aménagement VF 2 (240718).pdf";
  //     a.download = "Méthodologie.pdf";
  //     a.click();
  //     a.remove();
  //     setIsDownloadLoading(false);
  //   }, 1000);
  // };

  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-sm outfit-regular">
            {
              "Vous devez avoir un compte pour utiliser gratuitement notre outil."
            }
          </div>
        </div>
      }
      showArrow={true}
      color="default"
      className="categorize"
    >
      <Button
        color="primary"
        variant="shadow"
        size="lg"
        className="text-md rounded-full outfit-regular px-[10%] lg:px-[1.5%]"
        onClick={() => {
          window.location.href = "/pages/projects/create";
        }}
        endContent={<ChevronRight />}
      >
        Démarrer mon projet
      </Button>
    </Tooltip>
  );
};
