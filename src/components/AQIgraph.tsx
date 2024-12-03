import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useAirQuality } from "../hooks/useAirQualityData";
import { prepareDataForAQIGraph } from "../utils";

const AQIChart: React.FC = () => {
  const { aqiData } = useAirQuality();
  const { source, series } = prepareDataForAQIGraph(aqiData);

  const option: echarts.EChartsOption = {
    title: {
      text: "Air Quality Index (AQI)",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    dataset: {
      source,
    },
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    grid: { left: "5%", right: "5%", bottom: "10%" },
    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        { gt: 0, lte: 50, color: "#93CE07" },
        { gt: 50, lte: 100, color: "#FBDB0F" },
        { gt: 100, lte: 150, color: "#FC7D02" },
        { gt: 150, lte: 200, color: "#FD0100" },
        { gt: 200, lte: 300, color: "#AA069F" },
        { gt: 300, color: "#AC3B2A" },
      ],
      outOfRange: { color: "#999" },
    },
    series,
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "600px", width: "100%", paddingTop: 25 }}
      theme="dark"
    />
  );
};

export default AQIChart;
