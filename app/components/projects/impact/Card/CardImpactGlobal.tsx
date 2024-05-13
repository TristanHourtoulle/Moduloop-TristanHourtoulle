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
    <div
      className={`flex flex-col gap-6 w-full sm:w-[30%] items-center justify-between bg-white px-8 py-4 rounded-[16px]`}
      style={{
        borderTop: `5px solid ${color}`,
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h3 className="font-bold text-2xl">{title}</h3>
      <div className="flex items-center justify-between gap-4">
        <Image src={image} alt={title} width={40} height={40} />
        <p className="text-lg">{subtitle}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p className="font-bold text-5xl" style={{ color: color }}>
          {value}
        </p>
        <p>{unit}</p>
      </div>
      {title === "Ecosystèmes" && (
        <>
          <div className="flex items-center justify-between gap-4">
            <Image
              src={"/icons/marine-eutrophication.svg"}
              alt={title}
              width={40}
              height={40}
            />
            <p className="text-lg">Eutrophisation Marine</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className="font-bold text-5xl" style={{ color: color }}>
              {value2}
            </p>
            <p>kg P éq.</p>
          </div>
        </>
      )}
    </div>
  );
};
