import { Dougnhut } from "@components/Chart/Dougnhut";
// Remove the unnecessary import statement for Doughnut

export type CardMostImpactProps = {
  manufacturing: number;
  installation: number;
  usage: number;
  endOfLife: number; // "endOfLife" plutôt que "endOfLide"
  percentage: number;
  title: string;
  ranking: number;
};
const labels = ["Fabrication", "Installation", "Utilisation", "Fin de vie"];

function getPercentageRatio(value: number, total: number) {
  return (value / total) * 100;
}

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

  const totalValue = manufacturing + installation + usage + endOfLife;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "(en %)",
        data: [
          Number(getPercentageRatio(manufacturing, totalValue).toFixed(2)),
          Number(getPercentageRatio(installation, totalValue).toFixed(2)),
          Number(getPercentageRatio(usage, totalValue).toFixed(2)),
          Number(getPercentageRatio(endOfLife, totalValue).toFixed(2)),
        ],
        backgroundColor: ["#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0"],
        borderColor: ["#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {percentage > 0 ? (
        <div className="outfit-regular flex flex-col gap-2 w-full md:w-[50%] lg:w-[33%] p-[20px] bg-white rounded-[45px] md:w-[33%] border-2 border-[#D0D0D0]">
          <div className="flex flex-col items-start gap-0">
            <h4 className="text-md text-semibold md:text-lg">
              Représente <span className="font-bold">{percentage}%</span> de
              l'impact total
            </h4>
            <h2 className="text-xl md:text-2xl">{title}</h2>
          </div>
          <div className="flex items-center justify-between gap-3 lg:gap-0">
            <div className="flex flex-col gap-1 md:gap-2">
              <p className="text-md md:text-lg">Cycle de vie</p>
              <div className="flex items-center gap-1 md:gap-4">
                <div className="px-2 py-2 md:px-5 bg-[#FF6384]/20 rounded-[5px] border-solid border-2 border-[#FF6384] w-[10%] md:w-[20%] h-[10%]"></div>
                <p className="text-xs opacity-75 md:text-sm">Fabrication</p>
              </div>

              <div className="flex items-center gap-1 md:gap-4">
                <div className="px-2 py-2 md:px-5 bg-[#FF9F40]/20 rounded-[5px] border-solid border-2 border-[#FF9F40] w-[20%] h-[10%]"></div>
                <p className="text-xs opacity-75 md:text-sm">Installation</p>
              </div>

              <div className="flex items-center gap-1 md:gap-4">
                <div className="px-2 py-2 md:px-5 bg-[#FFCD56]/20 rounded-[5px] border-solid border-2 border-[#FFCD56] w-[20%] h-[10%]"></div>
                <p className="text-xs opacity-75 md:text-sm">Utilisation</p>
              </div>

              <div className="flex items-center gap-1 md:gap-4">
                <div className="px-2 py-2 md:px-5 bg-[#4BC0C0]/20 rounded-[5px] border-solid border-2 border-[#4BC0C0] w-[20%] h-[10%]"></div>
                <p className="text-xs opacity-75 md:text-sm">Fin de vie</p>
              </div>
            </div>

            <Dougnhut data={data} text={ranking.toString()} />
          </div>
        </div>
      ) : null}
    </>
  );
};
