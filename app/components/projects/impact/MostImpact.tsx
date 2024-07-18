"use client";

import { Button } from "@components/button/Button";
import { ProductImpact } from "@models/Impact";
import { ProjectType } from "@models/Project";
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
    <div className="w-full min-h-60 flex flex-col gap-2 md:gap-5 p-6 bg-[#e9e9e9] rounded-[16px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-center md:text-start md:gap-0">
        <h2 className="text-xl font-bold md:text-4xl opacity-90">
          Les produits les plus impactants
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start md:gap-5 md:mt-4 xl:mt-0">
          <Button
            variant="primary"
            onClick={() => {
              window.location.href = "https://www.moduloop.com/contact/";
            }}
            content="Contacter Moduloop"
            disabled={false}
            image={null}
            size="medium"
            moreClasses="border-2 border-[#E9E9E9]"
          />
          <Button
            variant="secondary"
            onClick={() => ctaView("products")}
            content="Modifier le projet"
            disabled={false}
            image={null}
            size="medium"
            moreClasses=""
          />
        </div>
      </div>

      {/* TODO: Replace this by a select option like on the projects page */}
      {/* Nav */}
      <div className="text-lg">
        <Select
          items={listImpact}
          labelPlacement="inside"
          label="Impact Choisi"
          size="lg"
          color="primary"
          className="w-full md:w-[50%] lg:w-[30%] font-medium text-lg"
          defaultOpen={false}
          defaultSelectedKeys={"rc"}
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
          <SelectSection title={"Vos groupes"} className="text-black">
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
      {/* <div className="flex flex-wrap items-center gap-2 md:gap-10">
        <p
          className={`font-bold transition-all text-lg ${getOpacity("rc")}`}
          onClick={() => {
            setView("rc");
          }}
        >
          Réchauffement Climatique
        </p>
        <p
          className={`font-bold transition-all text-lg ${getOpacity("erf")}`}
          onClick={() => {
            setView("erf");
          }}
        >
          Epuisement des Ressources Fossiles
        </p>
        <p
          className={`font-bold transition-all text-lg ${getOpacity("ase")}`}
          onClick={() => {
            setView("ase");
          }}
        >
          Acidification des Sols et des Eaux
        </p>
        <p
          className={`font-bold transition-all text-lg ${getOpacity("em")}`}
          onClick={() => {
            setView("em");
          }}
        >
          Eutrophisation Marine
        </p>
      </div> */}

      {/* All cards */}
      {productWithMostImpact !== null && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 md:gap-1 md:mt-0">
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
