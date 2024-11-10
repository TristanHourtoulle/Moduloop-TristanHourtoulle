import { ProjectType } from "@models/Project";
import {
  getASEimpact,
  getCO2impact,
  getEMimpact,
  getERFimpact,
} from "@utils/getImpact";
import { numberFormater } from "@utils/numberFormater";
import { CardImpactGlobal } from "./Card/CardImpactGlobal";

export type ImpactGlobalProjectProps = {
  project_one: ProjectType;
};

export const ImpactGlobalProject = (props: ImpactGlobalProjectProps) => {
  const { project_one } = props;
  const valueCO2 = getCO2impact(project_one);
  const valueERF = getERFimpact(project_one);
  const valueASE = getASEimpact(project_one);
  const valueEM = getEMimpact(project_one);

  return (
    <div className="w-full flex flex-col items-center md:items-start gap-2 outfit-regular">
      <h2 className="text-lg md:text-4xl">Estimatif d'Impact</h2>
      <div className="flex flex-col w-full md:my-[1%] gap-2 lg:gap-5 justify-between ">
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center lg:justify-between w-full">
          <CardImpactGlobal
            title="Santé Humaine"
            image="/icons/climate-change.svg"
            subtitle="Réchauffement climatique"
            color="#FE9E58"
            value={numberFormater(Number(valueCO2), false)}
            unit="kg éq. CO2"
          />
          <CardImpactGlobal
            title="Ressources Naturelles"
            image="/icons/resource-depletion.svg"
            subtitle="Epuisement des Ressources Fossiles"
            color="#FE5858"
            value={numberFormater(Number(valueERF), false)}
            unit="MJ"
          />
        </div>

        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center lg:justify-between w-full">
          <CardImpactGlobal
            title="Acidification des sols et eaux"
            image="/icons/acidification.svg"
            subtitle="Acidifications des Sols et Eaux"
            color="#55D789"
            value={numberFormater(Number(valueASE), true)}
            value2={numberFormater(Number(valueEM), true)}
            unit="mol H+ éq."
          />
          <CardImpactGlobal
            title="Eutrophisation marine"
            image="/icons/marine-eutrophication.svg"
            subtitle="Acidifications des Sols et Eaux"
            color="#55D789"
            value={numberFormater(Number(valueEM), true)}
            unit="kg P éq."
          />
        </div>
      </div>
    </div>
  );
};
