import { ProjectType } from "@models/Project";
import { CardImpactGlobal } from "./CardImpactGlobal";

export type ImpactGlobalProjectProps = {
  project_one: ProjectType;
};

export const ImpactGlobalProject = (props: ImpactGlobalProjectProps) => {
  const { project_one } = props;

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card">
      <h2 className="title">Impact global de {project_one.name}</h2>
      <div className="flex items-start justify-between">
        <CardImpactGlobal
          title="Santé Humaine"
          image="/icons/climate-change.svg"
          subtitle="Réchauffement climatique"
          color="#FF8A00"
          value={5.3}
          unit="kg éq. CO2"
        />
        <CardImpactGlobal
          title="Ecosystèmes"
          image="/icons/acidification.svg"
          subtitle="Acidifications des Sols et Eaux"
          color="#00A410"
          value={5.3}
          value2={5.3}
          unit="mol H+ éq."
        />
        <CardImpactGlobal
          title="Ressources Naturelles"
          image="/icons/resource-depletion.svg"
          subtitle="Epuisement des Ressources Fossiles"
          color="#FF3030"
          value={5.3}
          value2={5.3}
          unit="MJ"
        />
      </div>
    </div>
  );
};
