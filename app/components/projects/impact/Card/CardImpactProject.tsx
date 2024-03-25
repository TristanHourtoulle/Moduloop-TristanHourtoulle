import { ProjectType } from "@models/Project";
import {
  getASEimpact,
  getCO2impact,
  getEMimpact,
  getERFimpact,
} from "@utils/getImpact";
import Image from "next/image";
import { useEffect, useState } from "react";

export type CardImpactProjectProps = {
  project: ProjectType;
  type: string;
  impact: string;
};

export const CardImpactProject = (props: CardImpactProjectProps) => {
  const { project, type, impact } = props;
  const [unit, setUnit] = useState("kgCO2e");
  const [image, setImage] = useState("/icons/feuille.svg");
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (impact === "rc") {
      setResult(Number(getCO2impact(project)) || 0);
      setUnit("kgCO2e");
    } else if (impact === "erf") {
      setResult(Number(getERFimpact(project)) || 0);
      setUnit("MJ");
    } else if (impact === "ase") {
      setResult(Number(getASEimpact(project)) || 0);
      setUnit("mol H+");
    } else if (impact === "em") {
      setResult(Number(getEMimpact(project)) || 0);
      setUnit("kg P eq.");
    }

    if (type !== "better") {
      if (impact === "rc") setImage("/icons/rc.svg");
      if (impact === "erf") setImage("/icons/erf.svg");
      if (impact === "ase") setImage("/icons/ase.svg");
      if (impact === "em") setImage("/icons/em.svg");
    }
  });

  return (
    <div className="px-8 py-4 bg-white flex flex-col gap-2 rounded-[10px] drop-shadow-lg w-full">
      <h3 className="uppercase font-semibold text-2xl text-black opacity-95">
        {project.name}
      </h3>
      <div className="flex items-center gap-5">
        <Image
          src={image}
          alt="Ecologie"
          width={60}
          height={60}
          className="drop-shadow-lg"
        />
        <div className="flex items-end gap-3">
          <p className="text-black font-bold text-5xl">{result}</p>
          <p className="text-black font-regular text-xl">{unit}</p>
        </div>
      </div>
    </div>
  );
};