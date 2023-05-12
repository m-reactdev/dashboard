import { MDBContainer } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { DaysCount, KpiBox } from "../components/KpiBox";
import Charts from "../components/chart/Charts";
import { MonthYearPicker } from "../components/datepicker/DateMonthYearPicker";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };

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

  let name = months[startDate.getMonth()];

  return (
    <>
      <MDBContainer>
        <div className="home_page">
          <div className="main_hd">
            <h3>MASTER STATS_US REGION (DESIGN x BOOK WRITING)</h3>
            <div className="dateBtn">
              <button className="btn btn-primary" onClick={handleClick}>
                {name}, {startDate.getFullYear()}
                <span>
                  <MdOutlineKeyboardArrowDown />
                </span>
              </button>

              {isOpen && (
                <MonthYearPicker
                  handleChange={handleChange}
                  startDate={startDate}
                />
              )}
            </div>
          </div>
          <div className="kpis_block">
            <KpiBox
              title="Gross Sales Till Date"
              amount={"131,500"}
              border="#0B5394"
            />
            <KpiBox
              title="Chargeback or Refund"
              amount={"7,210"}
              percentage={"5.5"}
              border="#E30A0A"
            />
            <KpiBox
              title="Net Sales minus RF & CB"
              amount={"124,290"}
              border="#00B050"
            />
            <KpiBox title="Target" amount={"500,000"} border="#FFC000" />
            <KpiBox
              title="Achieved (%)"
              percentage={"24.9"}
              achieved={true}
              border="#FFC000"
            />

            <KpiBox
              title="Spending"
              amount={"41,500"}
              border="#CC00CC"
              limit={"105,000"}
            />
            <KpiBox
              title="ROI (Target +300%)"
              percentage={"299"}
              achieved={true}
              border="#CC00CC"
            />
            <KpiBox
              title="CURRENT (avg. sales/day)"
              amount={"15,536"}
              border="#00B050"
            />
            <KpiBox
              title="REQUIRED (sales/day)"
              amount={"31,309"}
              border="#FF0000"
            />
            <KpiBox
              title="ACCOUNTS"
              amount={"0"}
              border="#A64D79"
              limit={"120"}
              target={true}
            />
          </div>

          <div className="chart">
            <Charts />
          </div>

          <div className="daysBlock">
            <DaysCount title="Total Working Days" days="20" />
            <DaysCount title="Remaining Working Days" days="12" warn={true} />
          </div>

          <div className="flexItem">
            <div>
              <p className="txt-kpi">Based on current sales</p>
              <div className="kpis_block">
                <KpiBox
                  title="Fixed Costing ON TOP"
                  amount={"95,000"}
                  border="#FFC000"
                />
                <KpiBox
                  title="Projected Net Sales"
                  amount={"310,725"}
                  border="#3C78D8"
                />
              </div>
            </div>

            <div>
              <p className="txt-kpi">
                Money in the bank after merchant and other deductions (NET)
              </p>
              <div className="kpis_block">
                <KpiBox
                  title="3rd Party Payment"
                  amount={"17,034"}
                  border="#CC00CC"
                />

                <KpiBox
                  title="Income or (-$) Loss"
                  amount={"48,969"}
                  border="#6AA84F"
                />
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </>
  );
};

export default Home;
