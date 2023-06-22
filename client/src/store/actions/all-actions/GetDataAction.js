const fetchMonthlyData = (
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
) => {
  return async () => {
    let salesArray = [];
    let marketingArray = [];
    let complianceArray = [];
    const filterSaleCurrentMonthData = salesData?.filter((e) => {
      if (new Date(e.date).getMonth() === currentMonth.getMonth()) {
        return e;
      }
    });

    const filterMarketingCurrentMonthData = marketingData?.filter((e) => {
      if (new Date(e.date).getMonth() === currentMonth.getMonth()) {
        return e;
      }
    });

    const filterComplianceCurrentMonthData = complianceData?.filter((e) => {
      if (new Date(e.date).getMonth() === currentMonth.getMonth()) {
        return e;
      }
    });

    if (filterSaleCurrentMonthData.length > 0) {
      salesArray = filterSaleCurrentMonthData
        .filter((e) => e.code === "SL")
        .map((item) => {
          return {
            _id: item._id,
            code: item.code,
            date: item.date,
            name: item.name,
            timeStamp: item.timeStamp,
            description: item.description,
            sales: item.amount,
            status: item.status,
          };
        });
    }

    if (filterMarketingCurrentMonthData.length > 0) {
      marketingArray = filterMarketingCurrentMonthData
        .filter((e) => e.code === "MRKT")
        .map((item) => {
          return {
            _id: item._id,
            code: item.code,
            date: item.date,
            name: item.name,
            timeStamp: item.timeStamp,
            description: item.description,
            marketing: item.amount,
          };
        });
    }

    if (filterComplianceCurrentMonthData.length > 0) {
      complianceArray = filterComplianceCurrentMonthData
        .filter((e) => e.code === "CMPL")
        .map((item) => {
          return {
            _id: item._id,
            code: item.code,
            date: item.date,
            name: item.name,
            timeStamp: item.timeStamp,
            description: item.description,
            unit: item.unit,
            compliance: item.amount,
          };
        });
    }

    let merge1 = salesArray.concat(marketingArray);

    let merge2 = merge1.concat(complianceArray);

    var obj = {};
    for (var i = 0; i < merge2.length; i++) {
      var date = new Date(merge2[i].date);
      date = `${date.getFullYear()}-${date.toLocaleString("en-US", {
        month: "2-digit",
      })}-${date.getDate()}`;
      var p_date = obj[date] || {
        _id: "",
        date: "",
        name: "",
        timeStamp: "",
        description: "",
        unit: "-",
        sales: 0,
        marketing: 0,
        compliance: 0,
        status: "-",
      };
      obj[date] = Object.assign(p_date, merge2[i]);
    }

    var getMergeArray = Object.values(obj);
    setChartArray(getMergeArray);
    // console.log(getMergeArray);

    let filterSale = filterSaleCurrentMonthData.filter((e) => e.code === "SL");
    let filterSpending = filterMarketingCurrentMonthData.filter(
      (e) => e.code === "MRKT"
    );
    let filterChargeBack = filterComplianceCurrentMonthData.filter(
      (e) => e.code === "CMPL"
    );
    if (filterSale.length > 0) {
      var totalSale = 0;
      var totalChargeBack = 0;
      var totalSpending = 0;

      for (var i in filterSale) {
        totalSale += filterSale[i].amount;
      }

      for (var i in filterChargeBack) {
        totalChargeBack += filterChargeBack[i].amount;
      }

      for (var i in filterSpending) {
        totalSpending += filterSpending[i].amount;
      }

      setActiveDays(filterSale.length);
      setGrossSales(totalSale);
      setChargeBack(totalChargeBack);
      setSpending(totalSpending);
      setNetSales(totalSale - totalChargeBack);
    }

    if (allInventoryData) {
      let filterCurrentMonthData = allInventoryData.filter(
        (e) => new Date(e.date).getMonth() === currentMonth.getMonth()
      );

      if (filterCurrentMonthData) {
        var totalInventory = 0;
        for (var i in filterCurrentMonthData) {
          totalInventory += filterCurrentMonthData[i].amount;
        }
        setInventoryCost(totalInventory);
      }
    }

    if (allVendors) {
      let filterCurrentMonthData = allVendors.filter(
        (e) => new Date(e.date).getMonth() === currentMonth.getMonth()
      );

      if (filterCurrentMonthData) {
        var total = 0;
        for (var i in filterCurrentMonthData) {
          total += filterCurrentMonthData[i].amount;
        }
        setVendors(total);
      }
    }

    if (salesTarget) {
      let filterCurrentMonthData = salesTarget.filter(
        (e) => new Date(e.date).getMonth() === currentMonth.getMonth()
      );

      if (filterCurrentMonthData) {
        var totalSalesTarget = 0;
        var totalSpendingLimit = 0;
        for (var i in filterCurrentMonthData) {
          totalSalesTarget += filterCurrentMonthData[i].target;
          totalSpendingLimit += filterCurrentMonthData[i].limit;
        }
        setTargetSale(totalSalesTarget);
        setSpendingLimit(totalSpendingLimit);
      }
    }
  };
};

export { fetchMonthlyData };
