import { useLocation, useNavigate } from "react-router-dom";
import { useAirQuality } from "../hooks/useAirQualityData";
import CustomDatePicker from "./CustomDatePicker";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const isActive = (path: string) => location.pathname === path;

  // const paths = [
  //   { path: "/", name: "home" },
  //   { path: "/chart", name: "Chart" },
  //   { path: "/aqi-data", name: "AQI" },
  // ];

  const { data, clearAllSelection } = useAirQuality();

  return (
    <header className="fixed py-5 pr-5 lg:pr-8 z-10 w-screen bg-black">
      <div
        className={`flex items-center py-2 w-full ${
          location.pathname === "/" ? "justify-end" : "justify-between"
        }`}
      >
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center w-20 px-4 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="w-4 h-4 mr-2 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        )}
        {location.pathname === "/chart" && (
          <button
            onClick={() => navigate("/aqi-data")}
            className="text-sm font-inter hover:scale-105 uppercase shadow-sm shadow-primary px-4 rounded-lg"
          >
            {`View AQI`}
          </button>
        )}
        {location.pathname === "/" && (
          <button
            onClick={() => navigate("/chart")}
            className="text-sm font-inter hover:scale-105 uppercase shadow-sm shadow-primary px-4 rounded-lg"
          >
            {`View Graph`}
          </button>
        )}
        {location.pathname === "/aqi-data" && (
          <div>
            <p className="font-inter font-light text-2xl">Air Quality Index</p>
          </div>
        )}
        {location.pathname === "/aqi-data" && (
          <div>
            <p className="hidden">right side</p>
          </div>
        )}
      </div>
      {location.pathname === "/chart" && (
        <div className="flex lg:justify-center justify-between items-center w-full gap-10 px-5">
          <CustomDatePicker />
          {data?.length > 0 && (
            <button
              onClick={clearAllSelection}
              className="border rounded-md text-sm hover:scale-105 text-gray-500 px-2 hover:text-white hover:bg-opacity-50 z-50"
            >
              Clear All
            </button>
          )}
        </div>
      )}
      {location.pathname === "/aqi-data" && (
        <div className="flex flex-col items-center py-2 w-full">
          <CustomDatePicker />
        </div>
      )}
    </header>
  );
};

export default Header;
