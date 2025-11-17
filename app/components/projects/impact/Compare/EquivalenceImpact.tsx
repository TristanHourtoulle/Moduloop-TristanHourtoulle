import { ProjectType } from "@models/Project";
import {
  getCO2impact,
  getCO2impactBetweenTwoProjects,
  getERFimpact,
  getERFimpactBetweenTwoProjects,
} from "@utils/getImpact";
import { numberFormater } from "@utils/numberFormater";
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
  type?: string;
  impactType?: string;
  impactUnit?: string;
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
    type,
    impactType,
    impactUnit,
  } = props;

  const [image1, setImage1] = useState<string>("/icons/avion.svg");
  const [image2, setImage2] = useState<string>("/icons/personnes.svg");
  const [image3, setImage3] = useState<string>("/icons/suv.svg");
  const [colorImpactValue, setColorImpactValue] =
    useState<string>("text-[#FF8A00]");
  const [impactValue, setImpactValue] = useState<string>(
    getCO2impact(project).toString()
  );

  useEffect(() => {
    if (impactType === "RC" && type && type != undefined) {
      setImpactValue(getCO2impact(project).toString());
      setColorImpactValue("text-[#FF8A00]");
    } else if (impactType === "ERF" && type && type != undefined) {
      setImpactValue(getERFimpact(project).toString());
      setColorImpactValue("text-[#FF3030]");
    } else if (impactType === "RC") {
      setImpactValue(
        getCO2impactBetweenTwoProjects(worstProject, project).toString()
      );
      setColorImpactValue("text-[#FF8A00]");
    } else if (impactType === "ERF") {
      setImpactValue(
        getERFimpactBetweenTwoProjects(worstProject, project).toString()
      );
      setColorImpactValue("text-[#FF3030]");
    }

    if (impactType === "ERF") {
      setImage1("/icons/pétrol.svg");
      setImage2("/icons/lampadaire.svg");
      setImage3("/icons/maison.svg");
    }
  }, [project, worstProject, impactType, type, value1, value2, value3]);

  // Calculer le nombre de cards à afficher pour adapter le grid
  const numberOfCards = impactType === "ERF" ? 2 : 3;
  const gridColsClass = numberOfCards === 2
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="w-full flex flex-col gap-2 md:gap-3 items-center md:items-start">
      <div className="flex flex-col items-center md:items-start">
        {type && type != undefined && impactType === "RC" && (
          <p className="outfit-regular text-lg tertiary-color">
            Réchauffement climatique
          </p>
        )}
        {type && type != undefined && impactType === "ERF" && (
          <p className="outfit-regular text-lg tertiary-color">
            Epuisement des Ressources Fossiles
          </p>
        )}
        <h2 className="text-lg lg:text-2xl xl:text-3xl outfit-regular tertiary-color text-center">
          {!type || type === undefined
            ? `En choisissant ${project.name}, `
            : " "}
          {type && type != undefined ? "Vous consommez" : "vous évitez:"}{" "}
          <span className={colorImpactValue}>
            {numberFormater(Number(impactValue), false)}
          </span>{" "}
          <span className={"text-lg opacity-75"}>{impactUnit}</span>, équivaut
          à:
        </h2>
      </div>
      <div className={`grid ${gridColsClass} gap-2 md:gap-5 w-full`}>
        <CardEquivalenceImpact
          project={project}
          title={title1}
          image={image1}
          value={value1}
          unit={unit1}
          worstProject={worstProject}
        />
        {impactType === "ERF" ? null : (
          <>
            {/* <p className="text-lg font-bold">ou</p> */}
            <CardEquivalenceImpact
              project={project}
              title={title2}
              image={image2}
              value={value2}
              unit={unit2}
              worstProject={worstProject}
            />
          </>
        )}
        {/* <p className="text-lg font-bold">ou</p> */}
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
