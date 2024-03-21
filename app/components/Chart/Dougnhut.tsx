import { ArcElement, Chart, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export type DougnhutProps = {
  data: [];
  text: string;
};

export const Dougnhut = (props: DougnhutProps) => {
  const { data, text } = props;
  Chart.register(ArcElement, Tooltip);

  // Plugin personnalisé pour dessiner du texte au milieu du Doughnut
  const centerTextPlugin = {
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;

      ctx.restore();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, xCoor, yCoor);
    },
  };
  return (
    <div style={{ width: "150px", height: "150px" }}>
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};
