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
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card bg-[#e9e9e9] bg-opacity-90">
      <h2 className="title">Estimatif d'Impact global de {project_one.name}</h2>
      <div className="flex  flex-col sm:flex-row sm:items-start items-center justify-center sm:justify-between">
        <CardImpactGlobal
          title="Santé Humaine"
          image="/icons/climate-change.svg"
          subtitle="Réchauffement climatique"
          color="#FF8A00"
          value={numberFormater(Number(valueCO2), false)}
          unit="kg éq. CO2"
        />
        <CardImpactGlobal
          title="Ecosystèmes"
          image="/icons/acidification.svg"
          subtitle="Acidifications des Sols et Eaux"
          color="#00A410"
          value={numberFormater(Number(valueASE), true)}
          value2={numberFormater(Number(valueEM), true)}
          unit="mol H+ éq."
        />
        <CardImpactGlobal
          title="Ressources Naturelles"
          image="/icons/resource-depletion.svg"
          subtitle="Epuisement des Ressources Fossiles"
          color="#FF3030"
          value={numberFormater(Number(valueERF), false)}
          unit="MJ"
        />
      </div>
    </div>
  );
};
