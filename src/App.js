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
    "kaiserschmarn",
    "onion garlic veggie",
    "pelmini",
    "echo p{a,e}st{a,o}",
    "fried maultaschen w/ ketchup",
  ];

  const leastImpact = [
    "toast bread w/ butter and pepper",
    "ask flatmates",
    "pelmini",
    "fried maultaschen w/ ketchup",
    "scrambled eggs",
    "omlette",
    "onion garlic veggie",
    "echo p{a,e}st{a,o}",
    "kaiserschmarn",
  ];
  const simpleData = (item) => {
    const cost = cheapest.indexOf(item) + 1;
    const impact = leastImpact.indexOf(item) + 1;
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
            .map(({ cost, impact, item, ratio }) => (
              <tr key={cost}>
                <td>{cost}</td>
                <td>{impact}</td>
                <td>{item.toLowerCase()}</td>
                <td>{ratio}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="box">
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
                title: {
                  display: true,
                  font: { size: "20px" },
                  text: "low impact >>> big impact",
                },
                beginAtZero: true,
              },
              x: {
                title: {
                  display: true,
                  font: { size: "20px" },
                  text: "cheap >>> expensive",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
      <div>
        {console.log(
          cheapest.map(simpleData).sort((a, b) => b.ratio - a.ratio)
        )}
      </div>
      <tbody>
        <tr>
          <th>Input1</th>
          <th>Input2</th>
          <th>Output</th>
        </tr>
        <tr>
          <td>
            <pre>{`const cheapest = ` + JSON.stringify(cheapest, null, 2)}</pre>
          </td>
          <td>
            <pre>
              {`const leastImpact = ` + JSON.stringify(leastImpact, null, 2)}
            </pre>
          </td>
          <td>
            <pre>
              {JSON.stringify(
                cheapest.map(simpleData).sort((a, b) => b.ratio - a.ratio),
                null,
                2
              )}
            </pre>
          </td>
        </tr>
      </tbody>
    </div>
  );
}

export default App;
