"use client";

import { ProductImpact } from "@models/Impact";
import { ProjectType } from "@models/Project";
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
import { Pencil, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardMostImpact } from "./Card/CardMostImpact";

export type MostImpactProps = {
  project: ProjectType;
};

function getImpactInfo(product, project: ProjectType, type: string) {
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
      impact = getCO2impactByProduct(product.product);
      totalImpact = getCO2impact(project);
      manufacturing = Number(getC02manufacturing(product.product));
      installation = Number(getC02installation(product.product));
      usage = Number(getC02usage(product.product));
      endOfLife = Number(getC02endOfLife(product.product));
      break;
    case "erf":
      impact = getERFimpactByProduct(product.product);
      totalImpact = getERFimpact(project);
      manufacturing = Number(getERFmanufacturing(product.product));
      installation = Number(getERFinstallation(product.product));
      usage = Number(getERFusage(product.product));
      endOfLife = Number(getERFendOfLife(product.product));
      break;
    case "ase":
      impact = getASEimpactByProduct(product.product);
      totalImpact = getASEimpact(project);
      manufacturing = Number(getASEmanufacturing(product.product));
      installation = Number(getASEinstallation(product.product));
      usage = Number(getASEusage(product.product));
      endOfLife = Number(getASEendOfLife(product.product));
      break;
    case "em":
      impact = getEMimpactByProduct(product.product);
      totalImpact = getEMimpact(project);
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
  const { project } = props;
  const [view, setView] = useState("rc"); // "rc", "erf", "ase", "em"
  const [percentage, setPercentage] = useState(0);
  const [impactProducts, setImpactProducts] = useState<ProductImpact[] | null>(
    null
  );
  const [productWithMostImpact, setProductWithMostImpact] = useState<
    ProductImpact[] | null
  >(null);

  useEffect(() => {
    if (project.products === undefined || project.products === null) return;
    console.log("Je suis dans le useEffect avec la vue : ", view);
    let allProducts = [];
    for (let i = 0; i < project.products.length; i++) {
      let impact: string = "0";
      if (view === "rc") {
        impact = String(getCO2impactByProduct(project.products[i])); // Convert impact to string
      } else if (view === "erf") {
        impact = String(getERFimpactByProduct(project.products[i]));
      } else if (view === "ase") {
        impact = String(getASEimpactByProduct(project.products[i]));
      } else if (view === "em") {
        impact = String(getEMimpactByProduct(project.products[i]));
      }
      allProducts.push({ product: project.products[i], impact });
    }
    allProducts.sort((a, b) => b.impact - a.impact);
    const topThreeProducts = allProducts.slice(0, 3);
    const productsTemp: ProductImpact[] = [];
    setProductWithMostImpact([]);
    for (let i = 0; i < topThreeProducts.length; i++) {
      const temp: ProductImpact = getImpactInfo(
        topThreeProducts[i],
        project,
        view
      );
      productsTemp.push(temp);
    }
    setProductWithMostImpact(productsTemp);
    setImpactProducts(productsTemp);
  }, [project, view]);

  const getOpacity = (menuView: string) => {
    return menuView === view
      ? "opacity-100"
      : "opacity-50 hover:opacity-100 cursor-pointer";
  };

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card bg-[#e9e9e9]">
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
      </div>

      {/* All cards */}
      {productWithMostImpact !== null && (
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {productWithMostImpact[0] && (
            <CardMostImpact
              title={productWithMostImpact[0].product.product.name}
              percentage={productWithMostImpact[0].percentage}
              manufacturing={productWithMostImpact[0].manufacturing}
              installation={productWithMostImpact[0].installation}
              usage={productWithMostImpact[0].usage}
              endOfLife={productWithMostImpact[0].endOfLife}
              ranking={1}
            />
          )}

          {productWithMostImpact[1] && (
            <CardMostImpact
              title={productWithMostImpact[1].product.product.name}
              percentage={productWithMostImpact[1].percentage}
              manufacturing={productWithMostImpact[1].manufacturing}
              installation={productWithMostImpact[1].installation}
              usage={productWithMostImpact[1].usage}
              endOfLife={productWithMostImpact[1].endOfLife}
              ranking={2}
            />
          )}

          {productWithMostImpact[2] && (
            <CardMostImpact
              title={productWithMostImpact[2].product.product.name}
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
