import { createContext } from "react";

export interface IAirQualityData {
  co_gt?: number; // Carbon Monoxide
  pt08_s1_co?: number; // Sensor value for CO
  nmhc_gt?: number; // Non-Methanic Hydrocarbons
  c6h6_gt?: number; // Benzene
  pt08_s2_nmhc?: number; // Sensor value for NMHC
  nox_gt?: number; // Nitrogen Oxides
  pt08_s3_nox?: number; // Sensor value for NOx
  no2_gt?: number; // Nitrogen Dioxide
  pt08_s4_no2?: number; // Sensor value for NO2
  pt08_s5_o3?: number; // Sensor value for O3
  temperature?: number; // Temperature
  relative_humidity?: number; // Relative Humidity
  absolute_humidity?: number; // Absolute Humidity
}

export type Parameter = keyof IAirQualityData;
export interface Data extends IAirQualityData {
  _id: string; // Unique identifier
  date: string; // Date in "DD/MM/YYYY" format
  time: string; // Time in "HH.MM.SS" format
  dateTime: string; // ISO 8601 date-time string
}
export type FilteredDateRange = { startDate: Date; endDate: Date };

export interface ParameterInfo {
  name: string; // Display name for the parameter
  value: string; // Key corresponding to the parameter ie IAirQualityData
  color: string; // Hex color for the graph
  isSelected: boolean; // Indicates if the parameter is selected
}

export interface AirQualityContextType {
  data: Data[];
  aqiData: Data[];
  parameters: ParameterInfo[];
  handleSelectParameter: (value: string) => void;
  clearAllSelection: () => void;
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  fetchingData: boolean;
}

const AirQualityContext = createContext<AirQualityContextType | undefined>(
  undefined
);

export default AirQualityContext;
