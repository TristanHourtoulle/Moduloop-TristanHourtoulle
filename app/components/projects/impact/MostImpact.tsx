"use client";

import { ProductImpact } from "@models/Impact";
import { ProjectType } from "@models/Project";
import { Button as Button2 } from "@nextui-org/button";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import {
  getASEendOfLife,
  getASEimpact,
  getASEimpactByProduct,
  getASEinstallation,
  getASEmanufacturing,
  getASEusage,
  getC02endOfLife,
  getC02installation,
  getC02manufacturing,
  getC02usage,
  getCO2impact,
  getCO2impactByProduct,
  getEMendOfLife,
  getEMimpact,
  getEMimpactByProduct,
  getEMinstallation,
  getEMmanufacturing,
  getEMusage,
  getERFendOfLife,
  getERFimpact,
  getERFimpactByProduct,
  getERFinstallation,
  getERFmanufacturing,
  getERFusage,
} from "@utils/getImpact";
import { useEffect, useState } from "react";
import { CardMostImpact } from "./Card/CardMostImpact";

export type MostImpactProps = {
  project: ProjectType;
  ctaView: (view: string) => void;
};

function getImpactInfo(product: any, project: ProjectType, type: string) {
  if (project.products === undefined || project.products === null) {
    return null; // Retourne null si la vue n'est pas "rc" ou s'il n'y a pas de produits
  }

  let totalImpact = 0;
  let impact = 0;
  let manufacturing = 0;
  let installation = 0;
  let usage = 0;
  let endOfLife = 0;

  switch (type) {
    case "rc":
      impact = Number(getCO2impactByProduct(product.product));
      totalImpact = Number(getCO2impact(project));
      manufacturing = Number(getC02manufacturing(product.product));
      installation = Number(getC02installation(product.product));
      usage = Number(getC02usage(product.product));
      endOfLife = Number(getC02endOfLife(product.product));
      break;
    case "erf":
      impact = Number(getERFimpactByProduct(product.product));
      totalImpact = Number(getERFimpact(project));
      manufacturing = Number(getERFmanufacturing(product.product));
      installation = Number(getERFinstallation(product.product));
      usage = Number(getERFusage(product.product));
      endOfLife = Number(getERFendOfLife(product.product));
      break;
    case "ase":
      impact = Number(getASEimpactByProduct(product.product));
      totalImpact = Number(getASEimpact(project));
      manufacturing = Number(getASEmanufacturing(product.product));
      installation = Number(getASEinstallation(product.product));
      usage = Number(getASEusage(product.product));
      endOfLife = Number(getASEendOfLife(product.product));
      break;
    case "em":
      impact = Number(getEMimpactByProduct(product.product));
      totalImpact = Number(getEMimpact(project));
      manufacturing = Number(getEMmanufacturing(product.product));
      installation = Number(getEMinstallation(product.product));
      usage = Number(getEMusage(product.product));
      endOfLife = Number(getEMendOfLife(product.product));
      break;
    default:
      break;
  }

  let percentage = (impact / totalImpact) * 100;
  const result: ProductImpact = {
    product: product.product,
    manufacturing: manufacturing,
    installation: installation,
    usage: usage,
    endOfLife: endOfLife,
    total: Number(impact),
    percentage: Number(percentage.toFixed(0)),
  };

  return result;
}

export const MostImpact = (props: MostImpactProps) => {
  const { project, ctaView } = props;
  const [view, setView] = useState("rc"); // "rc", "erf", "ase", "em"
  const [productWithMostImpact, setProductWithMostImpact] = useState<
    ProductImpact[] | null
  >(null);
  const [listImpact, setListImpact] = useState<String[]>([
    "Réchauffement Climatique",
    "Epuisement des Ressources Fossiles",
    "Acidification des Sols et des Eaux",
    "Eutrophisation Marine",
  ]);

  useEffect(() => {
    if (!project.products) return;
    let allProducts = [];
    if (Array.isArray(project.products)) {
      for (let i = 0; i < project.products.length; i++) {
        let impact: string = "0";
        if (view === "rc") {
          impact = String(getCO2impactByProduct(project.products[i])) as string;
        } else if (view === "erf") {
          impact = String(getERFimpactByProduct(project.products[i])) as string;
        } else if (view === "ase") {
          impact = String(getASEimpactByProduct(project.products[i])) as string;
        } else if (view === "em") {
          impact = String(getEMimpactByProduct(project.products[i])) as string;
        }
        allProducts.push({ product: project.products[i], impact });
      }
      allProducts.sort((a, b) => Number(b.impact) - Number(a.impact));
    }
    const topThreeProducts = allProducts.slice(0, 3);
    const productsTemp: ProductImpact[] = [];
    setProductWithMostImpact([]);
    for (let i = 0; i < topThreeProducts.length; i++) {
      const temp: ProductImpact = getImpactInfo(
        topThreeProducts[i],
        project,
        view
      ) as ProductImpact; // Add type assertion here
      productsTemp.push(temp);
    }
    setProductWithMostImpact(productsTemp);
  }, [project, view]);

  const getOpacity = (menuView: string) => {
    return menuView === view
      ? "opacity-100"
      : "opacity-50 hover:opacity-100 cursor-pointer";
  };

  return (
    <div className="w-full min-h-60 flex flex-col gap-2 md:gap-5 p-6 bg-white rounded-[45px] border-2 border-[#D0D0D0]">
      {/* Header */}
      <div className="flex flex-wrap items-start lg:items-center justify-between gap-2 lg:text-center md:gap-0">
        <div className="flex flex-col gap-1 items-start w-full lg:max-w-[70%]">
          <h2 className="text-xl md:text-3xl tertiary-color outfit-regular">
            Les produits les plus impactants
          </h2>
          <p className="text-xs lg:text-md tertiary-color outfit-regular opacity-75">
            Les 4 types d’impact disponible sont: réchauffement climatique,
            épuisement des ressources fossiles, acidification des sols et Eaux
            ainsi que l’eutrophisation marine
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end md:gap-5 md:mt-4 xl:mt-0">
          <Button2
            onClick={() => ctaView("products")}
            color="primary"
            variant="ghost"
            radius="full"
            className="px-[25px] text-lg outfit-regular"
            size="md"
          >
            Modifier le projet
          </Button2>
        </div>
      </div>

      {/* TODO: Replace this by a select option like on the projects page */}
      {/* Nav */}
      <div className="text-sm lg:text-lg">
        <Select
          items={listImpact}
          labelPlacement="outside"
          label="Choisir un type d'impact"
          size="lg"
          variant="bordered"
          radius="full"
          className="w-full md:w-[50%] lg:w-[50%] text-lg outfit-regular"
          defaultOpen={false}
          placeholder="Réchauffement Climatique"
          onChange={(event: any) => {
            if (event.target.value === "Réchauffement Climatique")
              setView("rc");
            else if (
              event.target.value === "Epuisement des Ressources Fossiles"
            )
              setView("erf");
            else if (
              event.target.value === "Acidification des Sols et des Eaux"
            )
              setView("ase");
            else if (event.target.value === "Eutrophisation Marine")
              setView("em");
          }}
        >
          <SelectSection className="tertiary-color">
            {/* <SelectItem key={-1} value={-1}>
              Tous les groupes
            </SelectItem> */}
            {listImpact.map((impact) => (
              <SelectItem
                key={impact.toString() ?? "-2"}
                value={impact.toString() ?? "-3"}
                className="text-lg text-black font-outfit"
              >
                {impact ?? "Aucun nom"}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
      </div>

      {/* All cards */}
      {productWithMostImpact !== null && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 md:gap-1 md:mt-0 w-full">
          {productWithMostImpact[0] &&
            productWithMostImpact[0].product &&
            productWithMostImpact[0].product.product && (
              <CardMostImpact
                title={
                  productWithMostImpact[0]?.product?.product[0]?.name ?? ""
                }
                percentage={productWithMostImpact[0].percentage}
                manufacturing={productWithMostImpact[0].manufacturing}
                installation={productWithMostImpact[0].installation}
                usage={productWithMostImpact[0].usage}
                endOfLife={productWithMostImpact[0].endOfLife}
                ranking={1}
              />
            )}

          {productWithMostImpact[1] &&
            productWithMostImpact[1].product &&
            productWithMostImpact[1].product.product && (
              <CardMostImpact
                title={
                  productWithMostImpact[1]?.product?.product[0]?.name ?? ""
                }
                percentage={productWithMostImpact[1].percentage}
                manufacturing={productWithMostImpact[1].manufacturing}
                installation={productWithMostImpact[1].installation}
                usage={productWithMostImpact[1].usage}
                endOfLife={productWithMostImpact[1].endOfLife}
                ranking={2}
              />
            )}

          {productWithMostImpact[2] &&
            productWithMostImpact[2].product &&
            productWithMostImpact[2].product.product && (
              <CardMostImpact
                title={
                  productWithMostImpact[2]?.product?.product[0]?.name ?? ""
                }
                percentage={productWithMostImpact[2].percentage}
                manufacturing={productWithMostImpact[2].manufacturing}
                installation={productWithMostImpact[2].installation}
                usage={productWithMostImpact[2].usage}
                endOfLife={productWithMostImpact[2].endOfLife}
                ranking={3}
              />
            )}
        </div>
      )}
    </div>
  );
};
