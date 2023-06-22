import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { DaysCount, KpiBox } from "../../components/KpiBox";
import DatePickerButton from "../../components/datepicker/DatePickerButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../store/actions/all-actions/SalesAction";
import { fetchInventory } from "../../store/actions/all-actions/InventoryAction";
import { fetchVendors } from "../../store/actions/all-actions/VendorAction";
import SalesChart from "./chart/SalesChart";
import { fetchMonthlyData } from "../../store/actions/all-actions/GetDataAction";
import { fetchSalesTarget } from "../../store/actions/all-actions/SalesTargetAction";
import { fetchMarketing } from "../../store/actions/all-actions/MarketingAction";
import { fetchCompliance } from "../../store/actions/all-actions/ComplianceAction";

const Home = () => {
  // Get auth user and all sales & dispatch
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let salesData = useSelector(({ SalesState }) => {
    return SalesState.salesData;
  });
  let complianceData = useSelector(({ ComplianceState }) => {
    return ComplianceState.allCompliance;
  });
  let marketingData = useSelector(({ MarketingState }) => {
    return MarketingState.marketingData;
  });
  let allInventoryData = useSelector(({ InventoryState }) => {
    return InventoryState.allInventories;
  });
  let allVendors = useSelector(({ VendorState }) => {
    return VendorState.allVendors;
  });
  let salesTarget = useSelector(({ SalesTargetState }) => {
    return SalesTargetState.salesTargetData;
  });

  // All states here...
  const [targetSale, setTargetSale] = useState();
  const [workingDays, setWorkingDays] = useState(20);
  const [spendingLimit, setSpendingLimit] = useState();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeDays, setActiveDays] = useState(0);
  const [grossSales, setGrossSales] = useState();
  const [netSales, setNetSales] = useState();
  const [chargeBack, setChargeBack] = useState();
  const [spending, setSpending] = useState();
  const [inventoryCost, setInventoryCost] = useState();
  const [vendors, setVendors] = useState();
  const [chartArray, setChartArray] = useState([]);

  // Fetch Function
  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchMarketing());
    dispatch(fetchCompliance());
    dispatch(fetchInventory());
    dispatch(fetchVendors());
    dispatch(fetchSalesTarget());
    dispatch(
      fetchMonthlyData(
        salesData,
        complianceData,
        marketingData,
        currentMonth,
        setChartArray,
        setActiveDays,
        setGrossSales,
        setChargeBack,
        setSpending,
        setNetSales,
        allInventoryData,
        setInventoryCost,
        allVendors,
        setVendors,
        salesTarget,
        setTargetSale,
        setSpendingLimit
      )
    );
  }, [currentMonth]);

  return (
    <>
      <MDBContainer>
        <div className="home_page">
          <div className="main_hd">
            <h3>MASTER STATS_US REGION (DESIGN x BOOK WRITING)</h3>
            <DatePickerButton
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
            />
          </div>
          <MDBRow>
            <MDBCol lg={5}>
              <div className="daysBlock">
                <DaysCount title="Total Working Days" days={workingDays} />
                <DaysCount
                  title="Remaining Working Days"
                  days={workingDays - activeDays}
                  warn={true}
                />
              </div>
              <div className="kpis_block">
                <KpiBox
                  col="6"
                  title="Gross Sales Till Date"
                  amount={grossSales ? grossSales.toLocaleString("en-US") : "0"}
                  border="#0B5394"
                />
                <KpiBox
                  col="6"
                  title="Chargeback or Refund"
                  amount={chargeBack ? chargeBack.toLocaleString("en-US") : "0"}
                  percentage={
                    grossSales && chargeBack
                      ? ((chargeBack / grossSales) * 100).toFixed(1)
                      : "0"
                  }
                  border="#E30A0A"
                />
                <KpiBox
                  col="6"
                  title="Net Sales minus RF & CB"
                  amount={netSales ? netSales.toLocaleString("en-US") : "0"}
                  border="#00B050"
                />
                <KpiBox
                  col="6"
                  title="Target"
                  amount={targetSale ? targetSale.toLocaleString("en-US") : "0"}
                  border="#FFC000"
                />
                <KpiBox
                  col="6"
                  title="Achieved (%)"
                  percentage={
                    netSales && targetSale
                      ? ((netSales / targetSale) * 100).toFixed(2)
                      : "0"
                  }
                  achieved={true}
                  border="#FFC000"
                />

                <KpiBox
                  col="6"
                  title="Spending"
                  amount={spending ? spending.toLocaleString("en-US") : "0"}
                  border="#CC00CC"
                  limit={
                    spendingLimit ? spendingLimit.toLocaleString("en-US") : "0"
                  }
                />
              </div>
            </MDBCol>
            <MDBCol lg={7}>
              <div className="chart">
                <SalesChart
                  chartArray={chartArray}
                  currentMonth={currentMonth}
                />
              </div>
            </MDBCol>
          </MDBRow>

          <div className="kpis_block flex_four">
            <KpiBox
              col="3"
              title="ROI (Target +300%)"
              percentage={
                netSales && spending
                  ? ((netSales / spending) * 100).toFixed()
                  : "0"
              }
              achieved={true}
              border="#CC00CC"
            />
            <KpiBox
              col="3"
              title="CURRENT (avg. sales/day)"
              amount={
                netSales && activeDays
                  ? Math.trunc(netSales / activeDays).toLocaleString("en-US")
                  : "0"
              }
              border="#00B050"
            />
            <KpiBox
              col="3"
              title="REQUIRED (sales/day)"
              amount={Math.trunc(
                (targetSale - netSales) / (workingDays - activeDays)
              ).toLocaleString("en-US")}
              border="#FF0000"
            />
            <KpiBox
              col="3"
              title="ACCOUNTS"
              amount={"0"}
              border="#A64D79"
              limit={"120"}
              target={true}
            />
          </div>

          <div className="flexItem">
            <div>
              <p className="txt-kpi">Based on current sales</p>
              <div className="kpis_block">
                <KpiBox
                  col="6"
                  title="Fixed Costing ON TOP"
                  amount={
                    inventoryCost ? inventoryCost.toLocaleString("en-US") : "0"
                  }
                  border="#FFC000"
                />
                <KpiBox
                  col="6"
                  title="Projected Net Sales"
                  amount={
                    netSales
                      ? (
                          Math.trunc(netSales / activeDays) *
                            (workingDays - activeDays) +
                          grossSales -
                          chargeBack
                        ).toLocaleString("en-US")
                      : "0"
                  }
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
                  col="6"
                  title="3rd Party Payment"
                  amount={vendors ? vendors.toLocaleString("en-US") : "0"}
                  border="#CC00CC"
                />

                <KpiBox
                  col="6"
                  title="Income or (-$) Loss"
                  amount={(
                    grossSales -
                    grossSales * 0.15 -
                    chargeBack -
                    spending -
                    inventoryCost -
                    vendors
                  ).toLocaleString("en-US")}
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
