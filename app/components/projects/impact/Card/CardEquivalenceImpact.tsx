import { ProjectType } from "@models/Project";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import { useEffect, useState } from "react";

export type CardEquivalenceImpactProps = {
  project: ProjectType;
  worstProject: ProjectType;
  title: string;
  image: string;
  value: number;
  unit: string;
};

function removeSubstring(str: string, subString: string) {
  return str.replace(subString, "");
}

export const CardEquivalenceImpact = (props: CardEquivalenceImpactProps) => {
  const { project, title, image, value, unit, worstProject } = props;
  const [toolTipContent, setToolTipContent] = useState<string>("");
  const [toolTipSource, setToolTipSource] = useState<string>("");
  const [linkSource, setLinkSource] = useState<string>("");

  useEffect(() => {
    if (title === "paris - nice") {
      setToolTipContent(`0,524 tCO2 / passager pour un aller retour`);
      setToolTipSource(`Source: HelloCarbo`);
      setLinkSource(
        "https://www.hellocarbo.com/blog/calculer/empreinte-carbone-avion/"
      );
    } else if (title === "émission journalière") {
      setToolTipContent(
        `Consommation moyenne d’un français en un an = 8.9 tonnes de CO2 = 8900 kg de CO2`
      );
      setToolTipSource(`Source: Gouvernement Français`);
      setLinkSource(
        `https://www.statistiques.developpement-durable.gouv.fr/lempreinte-carbone-de-la-france-de-1995-2021#:~:text=En%202021%2C%20l%27empreinte%20carbone%20par%20personne%20est%20estim%C3%A9e%20%C3%A0,eq%2Fpersonne)%20et%202021`
      );
    } else if (title === "kms parcourus") {
      setToolTipContent(`0.17 kg de CO2 par kilomètre parcouru en SUV`);
      setToolTipSource(`Source: Statista`);
      setLinkSource(
        `https://fr.statista.com/infographie/27259/emissions-unitaires-moyennes-co2-voitures-particulieres-par-type-en-2022/`
      );
    } else if (title === "pétrol brut") {
      setToolTipContent(`1 baril d'équivalent pétrole = 5861.52 MJ`);
      setToolTipSource(`Source: UnitJuggler`);
      setLinkSource(
        `https://www.unitjuggler.com/convertir-energy-de-boe-en-MJ.html`
      );
    } else if (title === "Consommation électrique d'un foyer") {
      setToolTipContent(
        `En France la consommation moyenne d'électricité par personne et par an est de 2 223 kWh.`
      );
      setToolTipSource(`Source: Engie`);
      setLinkSource(
        `https://particuliers.engie.fr/electricite/conseils-electricite/conseils-tarifs-electricite/consommation-moyenne-electricite-personne.html#:~:text=En%20France%2C%20la%20consommation%20moyenne,kWh%20par%20an(1)`
      );
    }
  }, [title]);

  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">{toolTipContent}</div>
          <div className="text-tiny">
            <a target="_blank" href={linkSource}>
              {toolTipSource}
            </a>
          </div>
        </div>
      }
      showArrow={true}
      color="default"
      className="categorize"
    >
      <div className="px-4 py-2 md:px-8 md:py-4 bg-white flex flex-col justify-center gap-2 rounded-[10px] drop-shadow-lg w-[30%] min-w-[275px] ">
        <h3 className="uppercase font-semibold text-lg lg:text-xl xl:text-2xl text-black opacity-95">
          {title}
        </h3>
        <div className="flex items-center gap-2 md:gap-5">
          <Image
            src={image}
            alt={title}
            width={50}
            height={50}
            className="drop-shadow-lg"
          />
          <div className="flex flex-wrap items-end gap-2 xl:gap-3">
            <p className="text-black font-bold text-xl lg:text-2xl xl:text-4xl">
              {value}
            </p>
            <p className="text-black font-regular text-md lg:text-lg xl:text-xl">
              {unit}
            </p>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};
