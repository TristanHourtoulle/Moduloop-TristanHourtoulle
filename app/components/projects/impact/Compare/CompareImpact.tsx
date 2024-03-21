import { ProjectType } from "@models/Project";
import {
  getASEimpact,
  getCO2impact,
  getEMimpact,
  getERFimpact,
} from "@utils/getImpact";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CardImpactProject } from "../Card/CardImpactProject";

export type CompareImpactProps = {
  project_one: ProjectType;
  project_two: ProjectType;
  type: string;
  percentage: number;
};

export const CompareImpact = (props: CompareImpactProps) => {
  const { project_one, project_two, percentage, type } = props;

  const [betterProject, setBetterProject] = useState<ProjectType>(project_one);
  const [worstProject, setWorstProject] = useState<ProjectType>(project_two);
  const [title, setTitle] = useState<string>("");
  const [impact, setImpact] = useState<string>("rc");
  const [image, setImage] = useState<string>("/icons/ecologie.svg");

  useEffect(() => {
    const getBetterAndWorstProject = (
      project_one: ProjectType,
      project_two: ProjectType
    ) => {
      if (type === "Réchauffement climatique") {
        setTitle("émissions évitées");
        setImpact("rc");
        const valueOne = getCO2impact(project_one);
        const valueTwo = getCO2impact(project_two);
        if (valueOne > valueTwo) {
          setBetterProject(project_two);
          setWorstProject(project_one);
        }
      } else if (type === "Epuisement des ressources fossiles") {
        setTitle("épuisement évitées");
        setImpact("erf");
        setImage("/icons/éolienne.svg");
        const valueOne = getERFimpact(project_one);
        const valueTwo = getERFimpact(project_two);
        if (valueOne > valueTwo) {
          setBetterProject(project_two);
          setWorstProject(project_one);
        }
      } else if (type === "Acidification des sols et eaux") {
        setTitle("acidifications évitées");
        setImpact("ase");
        setImage("/icons/no-ase.svg");
        const valueOne = getASEimpact(project_one);
        const valueTwo = getASEimpact(project_two);
        if (valueOne > valueTwo) {
          setBetterProject(project_two);
          setWorstProject(project_one);
        }
      } else {
        setTitle("Eutrophisation évitée");
        setImpact("em");
        setImage("/icons/no-em.svg");
        const valueOne = getEMimpact(project_one);
        const valueTwo = getEMimpact(project_two);
        if (valueOne > valueTwo) {
          setBetterProject(project_two);
          setWorstProject(project_one);
        }
      }
    };
    getBetterAndWorstProject(project_one, project_two);
  });

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card">
      <h2 className="title">
        Impact de vos projets <span className="opacity-50">{type}</span>
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-10">
        {/* Ecologie Card */}
        <div className="px-8 py-4 bg-[#4AD860] flex flex-col gap-2 rounded-[10px] drop-shadow-lg w-full">
          <h3 className="uppercase font-semibold text-2xl text-white opacity-95">
            {title}
          </h3>
          <div className="flex items-center gap-5">
            <Image
              src={image}
              alt="Ecologie"
              width={60}
              height={60}
              className="drop-shadow-lg"
            />
            <p className="text-white font-bold text-5xl">{percentage}%</p>
          </div>
        </div>

        {/* Better Project */}
        <CardImpactProject
          project={betterProject}
          type="better"
          impact={impact}
        />
        {/* Worst Project */}
        <CardImpactProject
          project={worstProject}
          type="worst"
          impact={impact}
        />
      </div>
    </div>
  );
};
