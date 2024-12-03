import { ParameterInfo } from "../context/AirQualityContext";

export const parameters: ParameterInfo[] = [
  {
    name: "CO",
    value: "co_gt",
    color: "#FF5733",
    isSelected: false,
  }, // Carbon Monoxide
  {
    name: "CO",
    value: "pt08_s1_co",
    color: "#33FF57",
    isSelected: false,
  }, // Sensor value for CO
  {
    name: "NMHC",
    value: "nmhc_gt",
    color: "#3357FF",
    isSelected: false,
  }, // Non-Methanic Hydrocarbons
  {
    name: "Benzene (C6H6)",
    value: "c6h6_gt",
    color: "#FF33A1",
    isSelected: false,
  }, // Benzene
  {
    name: "NMHC",
    value: "pt08_s2_nmhc",
    color: "#FF8C33",
    isSelected: false,
  }, // Sensor value for NMHC
  {
    name: "NOx",
    value: "nox_gt",
    color: "#33FFD7",
    isSelected: false,
  }, // Nitrogen Oxides
  {
    name: "NOx",
    value: "pt08_s3_nox",
    color: "#A833FF",
    isSelected: false,
  }, // Sensor value for NOx
  {
    name: "NO2",
    value: "no2_gt",
    color: "#FF3380",
    isSelected: false,
  }, // Nitrogen Dioxide
  {
    name: "NO2",
    value: "pt08_s4_no2",
    color: "#FFDD33",
    isSelected: false,
  }, // Sensor value for NO2
  {
    name: "Ozone (O3)",
    value: "pt08_s5_o3",
    color: "#33BFFF",
    isSelected: false,
  }, // Sensor value for O3
  {
    name: "Temperature",
    value: "temperature",
    color: "#FF5733",
    isSelected: false,
  }, // Temperature
  {
    name: "Relative Humidity",
    value: "relative_humidity",
    color: "#33FF99",
    isSelected: false,
  }, // Relative Humidity
  {
    name: "Absolute Humidity",
    value: "absolute_humidity",
    color: "#3399FF",
    isSelected: false,
  }, // Absolute Humidity
];
