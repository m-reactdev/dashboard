import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthYearPicker = ({ handleChange, startDate, clsname, disable }) => {
  const [maxMonth, setMaxMonth] = useState(new Date(), 0);

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        maxDate={maxMonth}
        className={clsname ? "form-control" : ""}
        inline={clsname ? false : true}
        closeOnScroll={(e) => e.target === document}
        disabled={disable === true && true}
      />
    </>
  );
};

const DateMonthYearPicker = ({ handleChange, startDate, disable, minDate }) => {
  const [maxMonth, setMaxMonth] = useState(new Date(), 0);

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        maxDate={maxMonth}
        minDate={minDate && maxMonth}
        className="form-control"
        disabled={disable && true}
        closeOnScroll={(e) => e.target === document}
      />
    </>
  );
};

export { MonthYearPicker, DateMonthYearPicker };
