import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MonthYearPicker } from "./DateMonthYearPicker";

const DatePickerButton = (props) => {
  let { currentMonth, setCurrentMonth } = props;

  // Date Picker States
  const [isOpen, setIsOpen] = useState(false);

  //   Date Handle Click Function
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  //   Date Handle Change Function
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setCurrentMonth(e);
  };

  //   Get Month Names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //   let name = months[startDate.getMonth()];

  return (
    <>
      <div className="dateBtn">
        <button className="btn btn-primary" onClick={handleClick}>
          {months[currentMonth.getMonth()]}, {currentMonth.getFullYear()}
          <span>
            <MdOutlineKeyboardArrowDown />
          </span>
        </button>

        {isOpen && (
          <MonthYearPicker
            handleChange={handleChange}
            startDate={currentMonth}
          />
        )}
      </div>
    </>
  );
};

export default DatePickerButton;
