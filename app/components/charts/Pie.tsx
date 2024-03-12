import React from 'react'
import { PieConfigType } from '@models/PieType'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const Pie = ( props: {pieConfig: PieConfigType} ) => {
    const { pieConfig } = props

    // const data = {
    //     labels: pieConfig.data.map((item) => item.name),
    //     datasets: [
    //         {
    //             label: pieConfig.title,
    //             data: pieConfig.data.map((item) => item.value),
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1,
    //         }
    //     ]
    // };

    ChartJS.register(ArcElement, Tooltip);
    const data = {
      labels: [pieConfig.data[0].name, pieConfig.data[1].name, pieConfig.data[2].name],
      datasets: [
        {
          label: pieConfig.title,
          data: [pieConfig.data[0].value, pieConfig.data[1].value, pieConfig.data[2].value],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <Doughnut data={data} />
      </div>
    )
}

export default Pie