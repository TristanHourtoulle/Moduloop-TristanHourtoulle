import Image from "next/image";

export type CardImpactGlobalProps = {
  title: string;
  image: string;
  subtitle: string;
  color: string;
  value: string;
  unit: string;
  value2?: string;
};

export const CardImpactGlobal = (props: CardImpactGlobalProps) => {
  const { title, image, subtitle, color, value, value2, unit } = props;

  return (
    <div className="p-[20px] flex flex-col gap-8 justify-between w-full lg:w-[48%] rounded-[45px] border-2 border-[#D0D0D0] outfit-regular tertiary-color bg-white">
      {/* Header */}
      <div className="flex flex-row gap-8 items-center justify-start">
        <Image src={image} alt={title} width={45} height={45} />
        <h3 className="text-lg lg:text-2xl">{title}</h3>
      </div>

      <div className="flex items-center justify-center gap-4">
        <p className="text-3xl lg:text-6xl" style={{ color: color }}>
          {value}
        </p>
        <p className="opacity-75 text-md" style={{ color: color }}>
          {unit}
        </p>
      </div>
    </div>
    // <div
    //   className={`flex flex-col gap-6 w-full sm:w-[30%] items-center justify-between bg-white px-8 py-4 rounded-[16px]`}
    // >
    //   <h3 className="font-bold text-2xl">{title}</h3>
    //   <div className="flex items-center justify-between gap-4">
    //     <Image src={image} alt={title} width={40} height={40} />
    //     <p className="text-lg">{subtitle}</p>
    //   </div>
    //   <div className="flex flex-wrap items-center justify-center gap-4">
    //     <p
    //       className="font-bold text-3xl md:text-5xl whitespace-nowrap"
    //       style={{ color: color }}
    //     >
    //       {value}
    //     </p>
    //     <p>{unit}</p>
    //   </div>
    //   {title === "Ecosystèmes" && (
    //     <>
    //       <div className="flex items-center justify-between gap-4">
    //         <Image
    //           src={"/icons/marine-eutrophication.svg"}
    //           alt={title}
    //           width={40}
    //           height={40}
    //         />
    //         <p className="text-lg">Eutrophisation Marine</p>
    //       </div>
    //       <div className="flex items-center justify-center gap-4">
    //         <p
    //           className="font-bold text-3xl md:text-5xl"
    //           style={{ color: color }}
    //         >
    //           {value2}
    //         </p>
    //         <p>kg P éq.</p>
    //       </div>
    //     </>
    //   )}
    // </div>
  );
};
