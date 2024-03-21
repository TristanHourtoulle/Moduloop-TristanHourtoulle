import { ProjectType } from "@models/Project";
import Image from "next/image";

export type CardEquivalenceImpactProps = {
  project: ProjectType;
  worstProject: ProjectType;
  title: string;
  image: string;
  value: number;
  unit: string;
};

export const CardEquivalenceImpact = (props: CardEquivalenceImpactProps) => {
  const { project, title, image, value, unit, worstProject } = props;
  return (
    <div className="px-8 py-4 bg-white flex flex-col gap-2 rounded-[10px] drop-shadow-lg w-full">
      <h3 className="uppercase font-semibold text-2xl text-black opacity-95">
        {title}
      </h3>
      <div className="flex items-center gap-5">
        <Image
          src={image}
          alt={title}
          width={60}
          height={60}
          className="drop-shadow-lg"
        />
        <div className="flex items-end gap-3">
          <p className="text-black font-bold text-5xl">{value}</p>
          <p className="text-black font-regular text-xl">{unit}</p>
        </div>
      </div>
    </div>
  );
};
