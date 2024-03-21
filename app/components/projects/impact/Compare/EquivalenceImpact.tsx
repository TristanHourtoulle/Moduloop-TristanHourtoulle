import { ProjectType } from "@models/Project";
import { useEffect, useState } from "react";
import { CardEquivalenceImpact } from "../Card/CardEquivalenceImpact";

export type EquivalenceImpactProps = {
  project: ProjectType;
  worstProject: ProjectType;
  title1: string;
  title2: string;
  title3: string;
  value1: number;
  value2: number;
  value3: number;
  unit1: string;
  unit2: string;
  unit3: string;
};

export const EquivalenceImpact = (props: EquivalenceImpactProps) => {
  const {
    project,
    worstProject,
    value1,
    value2,
    value3,
    title1,
    title2,
    title3,
    unit1,
    unit2,
    unit3,
  } = props;

  const [image1, setImage1] = useState<string>("/icons/avion.svg");
  const [image2, setImage2] = useState<string>("/icons/personnes.svg");
  const [image3, setImage3] = useState<string>("/icons/suv.svg");

  useEffect(() => {
    if (title1 === "pétrol brut") {
      setImage1("/icons/pétrol.svg");
      setImage2("/icons/lampadaire.svg");
      setImage3("/icons/maison.svg");
    }
  });

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card">
      <h2 className="title">En choisissant {project.name}, vous évitez:</h2>
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <CardEquivalenceImpact
          project={project}
          title={title1}
          image={image1}
          value={value1}
          unit={unit1}
          worstProject={worstProject}
        />
        <p className="text-lg font-bold">ou</p>
        <CardEquivalenceImpact
          project={project}
          title={title2}
          image={image2}
          value={value2}
          unit={unit2}
          worstProject={worstProject}
        />
        <p className="text-lg font-bold">ou</p>
        <CardEquivalenceImpact
          project={project}
          title={title3}
          image={image3}
          value={value3}
          unit={unit3}
          worstProject={worstProject}
        />
      </div>
    </div>
  );
};
