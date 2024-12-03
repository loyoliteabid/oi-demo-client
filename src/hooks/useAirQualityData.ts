import { useContext } from "react";
import AirQualityContext, {
  AirQualityContextType,
} from "../context/AirQualityContext";

// Custom hook for easier context usage
export const useAirQuality = (): AirQualityContextType => {
  const context = useContext(AirQualityContext);
  if (!context) {
    throw new Error("useAirQuality must be used within an AirQualityProvider");
  }
  return context;
};
