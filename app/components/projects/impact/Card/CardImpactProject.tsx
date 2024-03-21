import { ProjectType } from "@models/Project";
import Image from "next/image";
import { getCO2impact } from "@utils/getImpact";

export type CardImpactProjectProps = {
  project: ProjectType;
  type: string;
};

export const CardImpactProject = (props: CardImpactProjectProps) => {
  const { project, type } = props;
  const result = getCO2impact(project);
  let image = "/icons/feuille.svg";
  console.log("project: ", project);

  if (type !== "better") {
    image = "/icons/rc.svg";
  }

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
          <p className="text-black font-regular text-xl">kgCO2e</p>
        </div>
      </div>
    </div>
  );
};
