import { Dougnhut } from "@components/Chart/Dougnhut";

export type CardMostImpactProps = {
  manufacturing: number;
  installation: number;
  usage: number;
  endOfLife: number; // "endOfLife" plutôt que "endOfLide"
  percentage: number;
  title: string;
  ranking: number;
};
const labels = ["Manufacturing", "Installation", "Usage", "End of Life"];

export const CardMostImpact = (props: CardMostImpactProps) => {
  const {
    manufacturing,
    installation,
    usage,
    endOfLife,
    percentage,
    title,
    ranking,
  } = props;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cycle de vie",
        data: [manufacturing, installation, usage, endOfLife],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="most-impact-card flex flex-col gap-2 md:w-[33%] max-w-md">
      <h4 className="text-lg">
        Représente <span className="font-bold">{percentage}%</span> de l'impact
        total
      </h4>
      <h2 className="font-bold text-3xl">{title}</h2>
      <div className="doughnut-container flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {/* Ici, vous pouvez créer votre légende personnalisée */}
          <p className="text-lg font-bold">Cycle de vie</p>
          <div className="flex gap-4 items-center">
            <div className="px-5 py-2 bg-[#FF6384]/20 rounded-[5px] border-solid border-2 border-[#FF6384] w-[20%] h-[10%]"></div>
            <p className="text-sm font-semibold opacity-75">Manufacturing</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="px-5 py-2 bg-[#FF9F40]/20 rounded-[5px] border-solid border-2 border-[#FF9F40] w-[20%] h-[10%]"></div>
            <p className="text-sm font-semibold opacity-75">Installation</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="px-5 py-2 bg-[#FFCD56]/20 rounded-[5px] border-solid border-2 border-[#FFCD56] w-[20%] h-[10%]"></div>
            <p className="text-sm font-semibold opacity-75">Usage</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="px-5 py-2 bg-[#4BC0C0]/20 rounded-[5px] border-solid border-2 border-[#4BC0C0] w-[20%] h-[10%]"></div>
            <p className="text-sm font-semibold opacity-75">EndOfLife</p>
          </div>
        </div>
        <Dougnhut data={data} text={ranking.toString()} />
      </div>
    </div>
  );
};
