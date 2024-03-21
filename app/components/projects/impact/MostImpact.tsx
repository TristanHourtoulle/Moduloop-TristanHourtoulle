"use client";

import { ProjectType } from "@models/Project";
import { Pencil, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CardMostImpact } from "./Card/CardMostImpact";

export type MostImpactProps = {
  project: ProjectType;
};

export const MostImpact = (props: MostImpactProps) => {
  const { project } = props;
  const [view, setView] = useState("sante-humaine");

  const getOpacity = (menuView: string) => {
    return menuView === view
      ? "opacity-100"
      : "opacity-50 hover:opacity-100 cursor-pointer";
  };

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-4xl opacity-90">
          Les produits les plus impactants pour{" "}
          <span className="opacity-50">{project.name}</span>
        </h2>
        <div className="flex items-center gap-5">
          <Link href="#" className="flex items-center gap-3 btn-contact">
            <Phone />
            <p className="text-lg">Contacter un expert</p>
          </Link>
          <Link href="#" className="flex items-center gap-3 btn-edit">
            <Pencil />
            <p className="text-lg">Modifier</p>
          </Link>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center gap-10">
        <p
          className={`font-bold transition-all text-lg ${getOpacity(
            "sante-humaine"
          )}`}
          onClick={() => {
            setView("sante-humaine");
          }}
        >
          Santé Humaine
        </p>
        <p
          className={`font-bold transition-all text-lg ${getOpacity(
            "ecosystemes"
          )}`}
          onClick={() => {
            setView("ecosystemes");
          }}
        >
          Ecosystèmes
        </p>
        <p
          className={`font-bold transition-all text-lg ${getOpacity(
            "ressources-naturelles"
          )}`}
          onClick={() => {
            setView("ressources-naturelles");
          }}
        >
          Ressources Naturelles
        </p>
      </div>

      {/* All cards */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <CardMostImpact
          title="Bibliothèque"
          percentage={20}
          manufacturing={50}
          installation={20}
          usage={20}
          endOfLife={10}
          ranking={1}
        />

        <CardMostImpact
          title="Plafond"
          percentage={10}
          manufacturing={10}
          installation={20}
          usage={50}
          endOfLife={10}
          ranking={2}
        />

        <CardMostImpact
          title="Bureau"
          percentage={5}
          manufacturing={20}
          installation={10}
          usage={20}
          endOfLife={50}
          ranking={3}
        />
      </div>
    </div>
  );
};
