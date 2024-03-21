import { ProjectType } from "@models/Project";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CardImpactProject, getCO2impact } from "../Card/CardImpactProject";

export type CompareImpactProps = {
  project_one: ProjectType;
  project_two: ProjectType;
  percentage: number;
};

export const CompareImpact = (props: CompareImpactProps) => {
  const { project_one, project_two, percentage } = props;

  const [betterProject, setBetterProject] = useState<ProjectType>(project_one);
  const [worstProject, setWorstProject] = useState<ProjectType>(project_two);

  useEffect(() => {
    const getBetterAndWorstProject = (
      project_one: ProjectType,
      project_two: ProjectType
    ) => {
      const valueOne = getCO2impact(project_one);
      const valueTwo = getCO2impact(project_two);
      if (valueOne > valueTwo) {
        setBetterProject(project_two);
        setWorstProject(project_one);
      }
    };
    getBetterAndWorstProject(project_one, project_two);
  });

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card">
      <h2 className="title">Impact de vos projets</h2>
      <div className="flex flex-col sm:flex-row items-center gap-10">
        {/* Ecologie Card */}
        <div className="px-8 py-4 bg-[#4AD860] flex flex-col gap-2 rounded-[10px] drop-shadow-lg w-full">
          <h3 className="uppercase font-semibold text-2xl text-white opacity-95">
            % émissions évitées
          </h3>
          <div className="flex items-center gap-5">
            <Image
              src={"/icons/ecologie.svg"}
              alt="Ecologie"
              width={60}
              height={60}
              className="drop-shadow-lg"
            />
            <p className="text-white font-bold text-5xl">{percentage}%</p>
          </div>
        </div>

        {/* Better Project */}
        <CardImpactProject project={betterProject} type="better" />
        {/* Worst Project */}
        <CardImpactProject project={worstProject} type="worst" />
      </div>
    </div>
  );
};
