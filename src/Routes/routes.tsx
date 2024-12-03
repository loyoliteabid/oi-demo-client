import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./home";
import ChartPage from "./chart";
import AQIPage from "./aqi";
import Header from "../components/Header";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/aqi-data" element={<AQIPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
