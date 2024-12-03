/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useAirQuality } from "../hooks/useAirQualityData";
import { prepareDataForGraph } from "../utils";

const MyChart: React.FC = () => {
  const { data, parameters } = useAirQuality();
  const { source, series } = prepareDataForGraph(data, parameters);

  const selectedParameters = parameters.filter((param) => param.isSelected);

  const selectedColors = selectedParameters
    .map((item) => (item.isSelected ? item.color : null))
    .filter((item) => item !== null);

  const option: echarts.EChartsOption = {
    legend: {},
    color: selectedColors,
    tooltip: {
      trigger: "axis",
      showContent: true,
    },
    dataset: {
      source,
    },
    xAxis: { type: "category" },
    yAxis: { gridIndex: 0 },
    // grid: { top: "45%" },
    series,
  };

  const onChartReady = (chart: echarts.EChartsType) => {
    chart.on("updateAxisPointer", function (event: any) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        chart.setOption({
          series: [
            {
              id: "pie",
              label: {
                formatter: `{b}: {@[${dimension}]} ({d}%)`,
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          ],
        });
      }
    });
  };

  return (
    <ReactECharts
      option={option}
      style={{
        width: `${Math.max(source[0].length * 80, 800)}px`, // Adjust width based on data points
        height: "auto",
        minHeight: "100vh",
        paddingTop: 20,
      }}
      onChartReady={onChartReady}
      theme="dark"
    />
  );
};

export default MyChart;
