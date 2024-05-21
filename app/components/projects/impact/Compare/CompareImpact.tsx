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
  const [bgColor, setBgColor] = useState<string>("rgba(255, 138, 0, 0.1)");
  const [finalPercentage, setFinalPercentage] = useState<string>(
    percentage.toString()
  );
  const [moreClasses, setMoreClasses] = useState<string>("");

  useEffect(() => {
    if (Number(finalPercentage) < 1 && Number(finalPercentage) >= 0) {
      setFinalPercentage("< 1");
    }
    let additionalClasses = "";
    if (type === "Réchauffement climatique") {
      setTitle("émissions évitées");
      setImpact("rc");
      const valueOne = getCO2impact(project_one);
      const valueTwo = getCO2impact(project_two);
      if (Number(valueOne) >= Number(valueTwo)) {
        setBetterProject(project_two);
        setWorstProject(project_one);
      } else {
        setBetterProject(project_one);
        setWorstProject(project_two);
      }
    } else if (type === "Epuisement des ressources fossiles") {
      setTitle("épuisement évitées");
      setImpact("erf");
      setImage("/icons/éolienne.svg");
      const valueOne = getERFimpact(project_one);
      const valueTwo = getERFimpact(project_two);
      if (Number(valueOne) >= Number(valueTwo)) {
        setBetterProject(project_two);
        setWorstProject(project_one);
      } else {
        setBetterProject(project_one);
        setWorstProject(project_two);
      }
      setBgColor("rgba(255, 48, 48, 0.1)");
    } else if (type === "Acidification des sols et eaux") {
      setTitle("acidifications évitées");
      setImpact("ase");
      setImage("/icons/no-ase.svg");
      const valueOne = getASEimpact(project_one);
      const valueTwo = getASEimpact(project_two);
      if (Number(valueOne) >= Number(valueTwo)) {
        setBetterProject(project_two);
        setWorstProject(project_one);
      } else {
        setBetterProject(project_one);
        setWorstProject(project_two);
      }
      setBgColor("rgba(0, 164, 16, 0.1)");
    } else {
      additionalClasses = "mt-[5%]";
      setTitle("Eutrophisation évitée");
      setImpact("em");
      setImage("/icons/no-em.svg");
      const valueOne = getEMimpact(project_one);
      const valueTwo = getEMimpact(project_two);
      if (Number(valueOne) >= Number(valueTwo)) {
        setBetterProject(project_two);
        setWorstProject(project_one);
      } else {
        setBetterProject(project_one);
        setWorstProject(project_two);
      }
      setBgColor("rgba(0, 164, 16, 0.1)");
    }
    setMoreClasses(additionalClasses);
  }, [project_one, project_two]);

  return (
    <div className="w-full min-h-60 flex flex-col gap-5 impact-section-card">
      <h2
        className={`text-lg lg:text-2xl xl:text-3xl font-bold ${moreClasses}`}
      >
        Estimatif d'impact de vos projets <br></br>
        <span className="opacity-50">{type}</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
        {/* Ecologie Card */}
        <div className="px-8 py-4 bg-[#4AD860] flex flex-col items-start justify-center gap-2 rounded-[10px] drop-shadow-lg w-[30%] min-w-[250px] ">
          <h3 className="uppercase font-semibold text-lg lg:text-xl xl:text-2xl text-white opacity-95">
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
            <p className="text-white font-bold text-3xl lg:text-4xl xl:text-5xl">
              {percentage.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Better Project */}
        <CardImpactProject
          project={betterProject}
          type="better"
          impact={impact}
          bgColor=""
        />
        {/* Worst Project */}
        <CardImpactProject
          project={worstProject}
          type="worst"
          impact={impact}
          bgColor={bgColor}
        />
      </div>
    </div>
  );
};
