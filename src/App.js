import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

function App() {
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const cheapest = [
    "ask flatmates",
    "toast bread w/ butter and pepper",
    "scrambled eggs",
    "omlette",
    "Kaiserschmarn",
    "onion garlic veggie",
    "pelmini",
    "pasta pesto",
    "fried maultaschen w/ ketchup",
  ];

  const mostImpact = [
    "Kaiserschmarn",
    "pasta pesto",
    "onion garlic veggie",
    "omlette",
    "scrambled eggs",
    "fried maultaschen w/ ketchup",
    "pelmini",
    "ask flatmates",
    "toast bread w/ butter and pepper",
  ];

  const formatData = (item) => {
    const cheapIndex = cheapest.indexOf(item) + 1;
    const impactIndex = mostImpact.length - mostImpact.indexOf(item);

    const ratio = Math.round((impactIndex / cheapIndex) * 100) / 100;

    return {
      label: `${item} | ratio:${ratio}`,
      data: [{ x: cheapIndex, y: impactIndex }],
      backgroundColor: "red",
      pointRadius: 10,
    };
  };

  const datasets = cheapest.map(formatData);
  const sortedDataSets = datasets.sort(
    (a, b) => b.label.split(":")[1] - a.label.split("ratio:")[1]
  );

  return (
    <div className="App">
      <Scatter
        data={{ datasets: sortedDataSets }}
        options={{
          plugins: {
            legend: {
              position: "left",
              labels: {
                usePointStyle: true,
              },
            },
          },
          scales: {
            y: {
              title: { display: true, text: "impact /taste" },
              beginAtZero: true,
            },
            x: {
              title: { display: true, text: "cheapest" },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default App;
