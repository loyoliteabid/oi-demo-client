import { useAirQuality } from "../hooks/useAirQualityData";

const Parameters: React.FC<{
  isMobile: boolean;
  setIsOpen: (b: boolean) => void;
}> = ({ isMobile, setIsOpen }) => {
  const { parameters, handleSelectParameter } = useAirQuality();

  const tracers = parameters.filter(
    (parameter) =>
      parameter.value === "co_gt" ||
      parameter.value === "nmhc_gt" ||
      parameter.value === "c6h6_gt" ||
      parameter.value === "nox_gt" ||
      parameter.value === "no2_gt" ||
      parameter.value === "o3_gt"
  );

  const sensors = parameters.filter(
    (parameter) =>
      parameter.value === "pt08_s1_co" ||
      parameter.value === "pt08_s2_nmhc" ||
      parameter.value === "pt08_s3_nox" ||
      parameter.value === "pt08_s4_no2" ||
      parameter.value === "pt08_s5_o3"
  );

  const otherParameters = parameters.filter(
    (parameter) =>
      parameter.value === "temperature" ||
      parameter.value === "relative_humidity" ||
      parameter.value === "absolute_humidity"
  );

  return (
    <ul className="p-4 flex flex-col gap-5">
      {/* Tracers Section */}
      <li className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg underline uppercase">Tracers</h3>
        <ul className="flex flex-col gap-1">
          {tracers.map((parameter) => (
            <li
              key={parameter.value}
              className={`p-1 rounded cursor-pointer hover:scale-105 text-sm text-gray-300`}
              style={{
                backgroundColor: parameter.isSelected
                  ? parameter.color
                  : "transparent",
                color: parameter.isSelected ? "black" : "white",
              }}
              onClick={() => {
                handleSelectParameter(parameter.value);
                if (isMobile) {
                  setIsOpen(false);
                }
              }}
            >
              {parameter.name}
            </li>
          ))}
        </ul>
      </li>

      {/* Sensors Section */}
      <li className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg uppercase underline">Sensors</h3>
        <ul className="flex flex-col gap-1">
          {sensors.map((parameter) => (
            <li
              key={parameter.value}
              className={`p-1 rounded cursor-pointer hover:scale-105 text-sm`}
              style={{
                backgroundColor: parameter.isSelected
                  ? parameter.color
                  : "transparent",
                color: parameter.isSelected ? "black" : "white",
              }}
              onClick={() => {
                handleSelectParameter(parameter.value);
                if (isMobile) {
                  setIsOpen(false);
                }
              }}
            >
              {parameter.name}
            </li>
          ))}
        </ul>
      </li>

      {/* Other Parameters Section */}
      <li className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg underline uppercase">
          Other Parameters
        </h3>
        <ul className="flex flex-col gap-1">
          {otherParameters.map((parameter) => (
            <li
              key={parameter.value}
              className={`p-1 rounded cursor-pointer hover:scale-105 text-sm`}
              style={{
                backgroundColor: parameter.isSelected
                  ? parameter.color
                  : "transparent",
                color: parameter.isSelected ? "black" : "white",
              }}
              onClick={() => {
                handleSelectParameter(parameter.value);
                if (isMobile) {
                  setIsOpen(false);
                }
              }}
            >
              {parameter.name}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default Parameters;
