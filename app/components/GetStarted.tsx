"use client";

import { Tooltip } from "@nextui-org/tooltip";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const GetStarted = () => {
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
      <Link
        href="/pages/projects/create"
        className="text-md rounded-full outfit-regular px-[10%] lg:px-[1.5%] bg-primary shadow-lg text-white py-3 flex items-center justify-center hover:bg-opacity-90 transition-all"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Pour simuler l'ombre du thème
        }}
      >
        Démarrer mon projet
        <ChevronRight className="ml-2" />
      </Link>
    </Tooltip>
  );
};
