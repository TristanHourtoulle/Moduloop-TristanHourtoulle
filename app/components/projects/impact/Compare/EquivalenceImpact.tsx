import { ProjectType } from "@models/Project";
import { CardEquivalenceImpact } from "../Card/CardEquivalenceImpact";

export type EquivalenceImpactProps = {
  project: ProjectType;
  worstProject: ProjectType;
  planeValue: number;
  personValue: number;
  kmValue: number;
};

export const EquivalenceImpact = (props: EquivalenceImpactProps) => {
  const { project, worstProject, planeValue, personValue, kmValue } = props;

  console.log("EquivalenceImpact In Section: ", planeValue);

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card">
      <h2 className="title">En choisissant {project.name}, vous évitez:</h2>
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <CardEquivalenceImpact
          project={project}
          title="PARIS - NICE"
          image="/icons/avion.svg"
          value={planeValue}
          unit="Aller - Retour"
          worstProject={worstProject}
        />
        <p className="text-lg font-bold">ou</p>
        <CardEquivalenceImpact
          project={project}
          title="émission journalière"
          image="/icons/personnes.svg"
          value={personValue}
          unit="Français"
          worstProject={worstProject}
        />
        <p className="text-lg font-bold">ou</p>
        <CardEquivalenceImpact
          project={project}
          title="kms parcourus en suv"
          image="/icons/suv.svg"
          value={kmValue}
          unit="Kms"
          worstProject={worstProject}
        />
      </div>
    </div>
  );
};
