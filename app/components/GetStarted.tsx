"use client";

import { Button } from "@nextui-org/button";
import { toast } from "sonner";

export const GetStarted = () => {
  return (
    <div className="flex items-center gap-5 mx-auto md:mx-0">
      <Button
        color="primary"
        variant="shadow"
        size="lg"
        className="text-lg bg-[#30c1bd]"
        onClick={() => {
          window.location.href = "/pages/projects";
        }}
      >
        Essayer
      </Button>
      <Button
        color="primary"
        variant="bordered"
        size="lg"
        className="text-lg border-[#30c1bd] text-[#30c1bd]"
        onClick={() => {
          toast.info("La méthodologie est en cours de développement ! :)");
        }}
      >
        Méthodologie
      </Button>
    </div>
  );
};
