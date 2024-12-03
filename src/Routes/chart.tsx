import Sidebar from "../components/Sidebar";
import MyChart from "../components/Chart";
import { useAirQuality } from "../hooks/useAirQualityData";

const ChartPage = () => {
  const { data, fetchingData } = useAirQuality();
  return (
    <div className="min-h-screen flex flex-col items-start gap-5 pt-40 lg:pt-36">
      <main id="graph" className="bg-navyBlue px-2">
        <div className="flex w-[calc(100vw-34px)] overflow-x-auto bg-navyBlue py-3">
          <Sidebar />
          {!fetchingData && data?.length > 0 && (
            <MyChart key={`data-length-${data.length}`} />
          )}
          {data?.length === 0 && (
            <div className="flex justify-center items-center flex-wrap w-[50vw] h-[80vh] italic font-inter text-xl md:text-2xl text-gray-500 pr-10 leading-5 md:leading-10 lg:max-w-lg mx-auto">
              Please select the desired parameters from the filters menu.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChartPage;
