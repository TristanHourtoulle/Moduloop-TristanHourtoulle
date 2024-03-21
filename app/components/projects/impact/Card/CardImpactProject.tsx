import { ProjectType } from "@models/Project";
import Image from "next/image";

export type CardImpactProjectProps = {
  project: ProjectType;
  type: string;
};

export function getCO2impact(project: ProjectType) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product.new.rc.manufacturing;
    result += qNew * product.product.new.rc.installation;
    result += qNew * product.product.new.rc.usage;
    result += qNew * product.product.new.rc.endOfLife;
    result += qUsed * product.product.reuse.rc.manufacturing;
    result += qUsed * product.product.reuse.rc.installation;
    result += qUsed * product.product.reuse.rc.usage;
    result += qUsed * product.product.reuse.rc.endOfLife;
  });

  return result.toFixed(0);
}

export const CardImpactProject = (props: CardImpactProjectProps) => {
  const { project, type } = props;
  const result = getCO2impact(project);
  let image = "/icons/feuille.svg";
  console.log("project: ", project);

  if (type !== "better") {
    image = "/icons/toxique.svg";
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
