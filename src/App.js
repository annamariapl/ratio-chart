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
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, {
    id: "colorQuadrants",
    beforeDraw: function (chart) {
      const { chartArea } = chart;
      const { ctx } = chart;

      // Replace these IDs if you have given your axes IDs in the config
      const xScale = chart.scales["x"];
      const yScale = chart.scales["y"];

      const midX = xScale.getPixelForValue((chart._metasets.length + 1) / 2);
      const midY = yScale.getPixelForValue((chart._metasets.length + 1) / 2);

      // Top left quadrant
      ctx.fillStyle = "rgba(48, 205, 71, 0.3)";
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        midX - chartArea.left,
        midY - chartArea.top
      );

      // Top right quadrant
      ctx.fillStyle = "rgba(255, 205, 71, 0.3)";

      ctx.fillRect(
        midX,
        chartArea.top,
        chartArea.right - midX,
        midY - chartArea.top
      );

      // Bottom right quadrant
      ctx.fillStyle = "rgba(255, 99, 71, 0.3)";
      ctx.fillRect(midX, midY, chartArea.right - midX, chartArea.bottom - midY);

      // Bottom left quadrant
      ctx.fillStyle = "rgba(255, 205, 71, 0.3)";
      ctx.fillRect(
        chartArea.left,
        midY,
        midX - chartArea.left,
        chartArea.bottom - midY
      );
    },
  });

  const [costInput, setcostInput] = useState(
    "ask flatmates\ntoast bread w/ butter and pepper\nscrambled eggs\nomlette\nkaiserschmarn\nonion garlic veggie\npelmini\necho pesto\nfried maultaschen w/ ketchup"
  );

  const [impactInput, setimpactInput] = useState(
    "toast bread w/ butter and pepper\nask flatmates\npelmini\nfried maultaschen w/ ketchup\nscrambled eggs\nomlette\nonion garlic veggie\necho pesto\nkaiserschmarn"
  );

  const byCost = costInput.split("\n");
  const byImpact = impactInput.split("\n");

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
      <h1>Impact Tool</h1>
      <tdbody>
        <tr>
          <th>sorted by cost (from low to high) </th>
          <th>sorted by impact (from low to high)</th>
        </tr>
        <tr>
          <td>
            <textarea
              name="byconst"
              rows="15"
              cols="50"
              value={costInput}
              onChange={(e) => setcostInput(e.target.value)}
            ></textarea>
          </td>
          <td>
            <textarea
              name="byconst"
              rows="15"
              cols="50"
              value={impactInput}
              onChange={(e) => setimpactInput(e.target.value)}
            ></textarea>
          </td>
        </tr>
      </tdbody>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                colorQuadrants: {},
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  position: "center",
                  title: {
                    display: true,
                    font: { size: "15px" },
                    text: "impact",
                    padding: -70,
                  },
                },
                x: {
                  position: "center",
                  title: {
                    display: true,
                    font: { size: "15px" },
                    text: "cost",
                    padding: 10,
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
