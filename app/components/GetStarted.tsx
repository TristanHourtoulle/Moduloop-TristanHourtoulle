"use client";

import { Button } from "@nextui-org/button";
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
    <Button
      color="primary"
      variant="shadow"
      size="lg"
      className="text-md rounded-full outfit-regular px-[1.5%]"
      onClick={() => {
        window.location.href = "/pages/projects/create";
      }}
      endContent={<ChevronRight />}
    >
      Démarrer mon projet
    </Button>
    // <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mx-auto md:mx-0">
    //   <Button
    //     color="primary"
    //     variant="shadow"
    //     size="lg"
    //     className="text-lg rounded-lg"
    //     onClick={() => {
    //       window.location.href = "/pages/projects";
    //     }}
    //   >
    //     Essayer l&apos;outil
    //   </Button>
    //   <Button
    //     color="primary"
    //     variant="bordered"
    //     startContent={
    //       isDownloadLoading ? (
    //         // <Spinner color="primary" labelColor="foreground" />
    //         <div className="loader">
    //           <Loader />
    //         </div>
    //       ) : (
    //         <Download />
    //       )
    //     }
    //     size="lg"
    //     className="text-lg rounded-lg"
    //     onClick={() => {
    //       handleDownloadGuideline();
    //     }}
    //   >
    //     Méthodologie
    //   </Button>
    // </div>
  );
};
