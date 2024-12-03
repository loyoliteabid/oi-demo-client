/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, ParameterInfo } from "../context/AirQualityContext";

export const prepareDataForGraph = (
  data: Data[],
  parameters: ParameterInfo[]
): { source: any; series: any } => {
  // Step 1: Sort data by ascending dateTime
  const sortedData = [...data].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );

  // Step 2: Filter parameters that are selected
  const selectedParameters = parameters.filter((param) => param.isSelected);

  // Step 3: Prepare the header row
  const headerRow = [
    "Parameter",
    ...sortedData.map((item) => {
      const date = new Date(item.dateTime);
      return `${date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}: ${date.getHours()} hrs`;
    }),
  ];

  // Step 4: Prepare data rows for each selected parameter
  const parameterRows = selectedParameters.map((param) => {
    return [
      param.name,
      ...sortedData.map((item) => {
        const value = (item[param.value as keyof Data] as number) || null;
        return Number(value) >= 0 ? Number(value) : null; // Avoid negative numbers in graph
      }), // Handle undefined or missing values
    ];
  });

  // Step 5: Combine header and parameter rows
  const source = [headerRow, ...parameterRows];

  // Step 6: Prepare series configuration
  const series: any = selectedParameters.map((param) => ({
    type: "line",
    smooth: true,
    seriesLayoutBy: "row",
    emphasis: { focus: "series" },
    lineStyle: { color: param.color }, // Add color from the parameter info
  }));

  return { source, series };
};

const aqiBreakpoints = {
  pm25: [
    { min: 0, max: 12, aqiLow: 0, aqiHigh: 50 },
    { min: 12.1, max: 35.4, aqiLow: 51, aqiHigh: 100 },
    { min: 35.5, max: 55.4, aqiLow: 101, aqiHigh: 150 },
    { min: 55.5, max: 150.4, aqiLow: 151, aqiHigh: 200 },
    { min: 150.5, max: 250.4, aqiLow: 201, aqiHigh: 300 },
    { min: 250.5, max: 500.4, aqiLow: 301, aqiHigh: 500 },
  ],
  pm10: [
    { min: 0, max: 54, aqiLow: 0, aqiHigh: 50 },
    { min: 55, max: 154, aqiLow: 51, aqiHigh: 100 },
    { min: 155, max: 254, aqiLow: 101, aqiHigh: 150 },
    { min: 255, max: 354, aqiLow: 151, aqiHigh: 200 },
    { min: 355, max: 424, aqiLow: 201, aqiHigh: 300 },
    { min: 425, max: 604, aqiLow: 301, aqiHigh: 500 },
  ],
  no2: [
    { min: 0, max: 53, aqiLow: 0, aqiHigh: 50 },
    { min: 54, max: 100, aqiLow: 51, aqiHigh: 100 },
    { min: 101, max: 360, aqiLow: 101, aqiHigh: 150 },
    { min: 361, max: 649, aqiLow: 151, aqiHigh: 200 },
    { min: 650, max: 1249, aqiLow: 201, aqiHigh: 300 },
    { min: 1250, max: 2049, aqiLow: 301, aqiHigh: 500 },
  ],
  co: [
    { min: 0, max: 4.4, aqiLow: 0, aqiHigh: 50 },
    { min: 4.5, max: 9.4, aqiLow: 51, aqiHigh: 100 },
    { min: 9.5, max: 12.4, aqiLow: 101, aqiHigh: 150 },
    { min: 12.5, max: 15.4, aqiLow: 151, aqiHigh: 200 },
    { min: 15.5, max: 30.4, aqiLow: 201, aqiHigh: 300 },
    { min: 30.5, max: 50.4, aqiLow: 301, aqiHigh: 500 },
  ],
};

const calculateAQI = (
  concentration: number,
  pollutant: keyof typeof aqiBreakpoints
): number => {
  const breakpoints = aqiBreakpoints[pollutant];
  for (const bp of breakpoints) {
    if (concentration >= bp.min && concentration <= bp.max) {
      return (
        ((concentration - bp.min) / (bp.max - bp.min)) *
          (bp.aqiHigh - bp.aqiLow) +
        bp.aqiLow
      );
    }
  }
  return 0; // Default to 0 if out of range
};

const calculateOverallAQI = (data: Data[]) => {
  return data.map((item) => {
    const pm25 = item.pt08_s5_o3 || 0; // Replace with your PM2.5 field
    const pm10 = item.pt08_s1_co || 0; // Replace with your PM10 field
    const no2 = item.no2_gt || 0; // Replace with your NO₂ field

    const pm25AQI = calculateAQI(pm25, "pm25");
    const pm10AQI = calculateAQI(pm10, "pm10");
    const no2AQI = calculateAQI(no2, "pm25");

    // The overall AQI is the max AQI among all pollutants
    const overallAQI = Math.max(pm25AQI, pm10AQI, no2AQI);

    return {
      ...item,
      aqi: Math.round(overallAQI),
    };
  });
};

export const prepareDataForAQIGraph = (
  incomingData: Data[]
): { source: any; series: any } => {
  const data = calculateOverallAQI(incomingData); // Add AQI field to data
  // Sort data by ascending dateTime
  const sortedData = [...data].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );

  // Prepare the header row
  const headerRow = [
    "DateTime",
    ...sortedData.map((item) => new Date(item.dateTime).toLocaleString()),
  ];

  // Prepare AQI row (Assume AQI is pre-calculated in the data)
  const aqiRow = [
    "AQI",
    ...sortedData.map((item) => item.aqi || null), // Replace with your AQI field
  ];

  // Combine header and AQI row
  const source = [headerRow, aqiRow];

  // Prepare series configuration
  const series = [
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
  ];

  return { source, series };
};
