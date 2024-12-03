import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

import { useAirQuality } from "../hooks/useAirQualityData";

const CustomDatePicker: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useAirQuality();

  const minDate = new Date("2004-03-01");
  const maxDate = new Date("2005-02-28");

  const handleStartDateChange = (date: Date | null) => {
    if (date && date > maxDate) {
      toast.error("Start date cannot be after February 2005!");
      return;
    }
    if (date && endDate && date > endDate) {
      toast.error("Start date cannot be after end date!");
      return;
    }
    setStartDate(date || minDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date && date < minDate) {
      toast.error("End date cannot be before March 2004!");
      return;
    }
    if (date && startDate && date < startDate) {
      toast.error("End date cannot be before start date!");
      return;
    }
    setEndDate(date || maxDate);
  };

  return (
    <div className="flex gap-2 lg:gap-5 mx-auto flex-wrap">
      <div className="flex gap-3">
        <label className="w-10">From</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          minDate={minDate}
          maxDate={maxDate}
          showTimeSelect
          dateFormat="Pp"
          className="text-navyBlue text-center rounded-xl font-bold cursor-pointer text-sm"
        />
      </div>
      <div className="flex gap-3">
        <label className="w-10">To</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={minDate}
          maxDate={maxDate}
          showTimeSelect
          dateFormat="Pp"
          className="text-navyBlue text-center rounded-xl font-bold cursor-pointer text-sm"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
