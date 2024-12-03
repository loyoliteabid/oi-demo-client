import AQIChart from "../components/AQIgraph";

const AQIPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-start gap-5 pt-40 lg:pt-36 bg-navyBlue">
      <AQIChart />
    </div>
  );
};

export default AQIPage;
