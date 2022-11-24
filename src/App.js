import React, { useState } from "react";
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

  const byCostInit = [
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

  const byImpactArray = [
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

  const [costArray, setcostArray] = useState(
    JSON.stringify(byCostInit, null, 2)
  );
  const [impactArray, setimpactArray] = useState(
    JSON.stringify(byImpactArray, null, 2)
  );

  const byCost = JSON.parse(costArray);
  const byImpact = JSON.parse(impactArray);

  const simpleData = (item) => {
    const cost = byCost.indexOf(item) + 1;
    const impact = byImpact.indexOf(item) + 1;
    const ratio = Math.round((impact / cost) * 100) / 100;
    return {
      item,
      cost,
      impact,
      ratio,
    };
  };

  const sortedByRatio = byCost
    .map(simpleData)
    .sort((a, b) => b.ratio - a.ratio);

  const scatterFormat = (item) => {
    const { cost, impact, ratio } = simpleData(item);
    return {
      label: `${item} | ratio:${ratio}`,
      data: [{ x: cost, y: impact }],
      backgroundColor: "red",
      pointRadius: 7,
    };
  };

  return (
    <div className="App">
      <tdbody>
        <tr>
          <th>sorted by cost (from low high) </th>
          <th>sorted by impact (from low to high)</th>
        </tr>
        <tr>
          <td>
            <textarea
              name="byconst"
              rows="15"
              cols="50"
              value={costArray}
              onChange={(e) => setcostArray(e.target.value)}
            ></textarea>
          </td>
          <td>
            <textarea
              name="byconst"
              rows="15"
              cols="50"
              value={impactArray}
              onChange={(e) => setimpactArray(e.target.value)}
            ></textarea>
          </td>
        </tr>
      </tdbody>
      <div style={{ display: "flex" }}>
        <table id="ratios" style={{ maxWidth: "30%" }}>
          <tbody>
            <tr>
              <th>Cost</th>
              <th>Impact</th>
              <th>Item</th>
              <th>Ratio [impact / cost]</th>
            </tr>
            {sortedByRatio.map(({ cost, impact, item, ratio }) => (
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
            data={{ datasets: byCost.map(scatterFormat) }}
            height={null} // must stay null, otherwise 'aspectRatio' won't work.  Adjust instead the wraping div.
            width={null} // must stay null, otherwise 'aspectRatio' won't work. Adjust instead the wraping div.
            options={{
              aspectRatio: 1,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  grace: "10%",
                  position: "center",
                  title: {
                    display: true,
                    font: { size: "15px" },
                    text: "big <<< low (impact)",
                    padding: 100,
                  },
                },
                x: {
                  grace: "10%",
                  position: "center",
                  title: {
                    display: true,
                    font: { size: "15px" },
                    text: "cheap >>> expensive",
                    padding: 100,
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div>
        <pre>{JSON.stringify(sortedByRatio, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
