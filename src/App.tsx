import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AirQualityContext, {
  Data,
  ParameterInfo,
} from "./context/AirQualityContext";
import Routes from "./Routes";
import { parameters as initialParameters } from "./data";
import useDataFetch from "./hooks/useDataFetch";
import LoadingModal from "./components/LoadingModal";

function App() {
  const {
    data: updatedData,
    fetchData,
    loading: fetchingData,
    error: fetchingError,
    clearError,
  } = useDataFetch<Data[]>();

  const { data: updatedAqiData, fetchData: fetchAqiData } =
    useDataFetch<Data[]>();

  const [data, setData] = useState<Data[]>([]);
  const [aqiData, setAqiData] = useState<Data[]>([]);
  const [parameters, setParameters] =
    useState<ParameterInfo[]>(initialParameters);
  const [startDate, setStartDate] = useState<Date>(
    new Date("2004-03-10T18:00:00")
  );
  const [endDate, setEndDate] = useState<Date>(new Date("2004-06-10T18:00:00"));

  const handleSelectParameter = (value: string) => {
    setParameters((prev) =>
      prev.map((param) =>
        param.value === value
          ? { ...param, isSelected: !param.isSelected }
          : param
      )
    );
  };

  const clearAllSelection = () => {
    setParameters(initialParameters);
    setData([]);
  };

  useEffect(() => {
    if (fetchingError) {
      toast.error(fetchingError, {
        onClose: () => {
          clearError("");
        },
      });
    }
  }, [fetchingError, clearError]);

  useEffect(() => {
    if (updatedData !== null) {
      setData(updatedData);
    }
  }, [updatedData]);

  useEffect(() => {
    // AQI data
    if (updatedAqiData !== null) {
      setAqiData(updatedAqiData);
    }
  }, [updatedAqiData]);

  useEffect(() => {
    // call api and update Data
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      parameters: parameters
        .filter((param) => param.isSelected)
        .map((param) => param.value)
        .join(","),
    };

    const queryString = new URLSearchParams(params).toString();

    const refreshData = async () => {
      try {
        await fetchData(`/filtered-data?${queryString}`);
      } catch (err) {
        console.log(err);
      }
    };

    refreshData();
  }, [startDate, endDate, parameters, fetchData]);

  useEffect(() => {
    const wholeParameters =
      "co_gt,pt08_s1_co,nmhc_gt,c6h6_gt,pt08_s2_nmhc,nox_gt,pt08_s3_nox,no2_gt,pt08_s4_no2,pt08_s5_o3,temperature,relative_humidity,absolute_humidity";

    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      parameters: wholeParameters,
    };

    const queryString = new URLSearchParams(params).toString();

    const refreshData = async () => {
      try {
        await fetchAqiData(`/filtered-data?${queryString}`);
      } catch (err) {
        console.log(err);
      }
    };

    refreshData();
  }, [startDate, endDate, fetchAqiData]);

  return (
    <AirQualityContext.Provider
      value={{
        data,
        aqiData,
        parameters,
        handleSelectParameter,
        clearAllSelection,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        fetchingData,
      }}
    >
      <Routes />
      <LoadingModal isOpen={fetchingData} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AirQualityContext.Provider>
  );
}

export default App;
