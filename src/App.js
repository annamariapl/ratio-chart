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

  const simpleData = (item) => {
    const cost = cheapest.indexOf(item) + 1;
    const impact = mostImpact.length - mostImpact.indexOf(item);
    const ratio = Math.round((impact / cost) * 100) / 100;
    return {
      item,
      cost,
      impact,
      ratio,
    };
  };

  const formatedData = (item) => {
    const { cost, impact, ratio } = simpleData(item);
    return {
      label: `${item} | ratio:${ratio}`,
      data: [{ x: cost, y: impact }],
      backgroundColor: "red",
      pointRadius: 10,
    };
  };

  return (
    <div className="App">
      <Scatter
        data={{ datasets: cheapest.map(formatedData) }}
        options={{
          plugins: {
            legend: {
              display: false,
              // position: "left",
              // labels: {
              //   usePointStyle: true,
              // },
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
      <table id="ratios">
        <tbody>
          <tr>
            <th>Cost</th>
            <th>Impact</th>
            <th>Item</th>
            <th>Ratio [impact / cost]</th>
          </tr>
          {cheapest
            .map(simpleData)
            .sort((a, b) => b.ratio - a.ratio)
            .map(({ item, cost, impact, ratio }) => {
              console.log("item", item);
              return (
                <tr key={cost}>
                  <td>{cost}</td>
                  <td>{impact}</td>
                  <td>{item.toLowerCase()}</td>
                  <td>{ratio}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
