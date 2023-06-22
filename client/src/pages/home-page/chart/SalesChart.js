import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import "chartjs-adapter-date-fns";
import { Chart } from "chart.js/auto";

const SalesChart = ({ chartArray, currentMonth }) => {
  const [month, setMonth] = useState("");
  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();

  let labels =
    chartArray.length > 0 && chartArray.map((e) => new Date(e.state));

  const options = {
    // tension: 0.4,
    // pointRadius: 0,
    // pointHoverRadius: 7,
    pointHitRadius: 10,
    interaction: {
      mode: "index",
    },

    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        min: firstDate,
        max: lastDate,
      },
      y: {
        min: 0,
        max: 30000,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      responsive: true,
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Chargeback / Refund",
        type: "line",
        data: chartArray.length > 0 && chartArray.map((e) => e.charge),
        borderColor: "rgba(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132)",
        pointHoverBorderWidth: 2,
        hoverBackgroundColor: "white",
        pointHoverBorderColor: "rgba(255, 99, 132)",
      },
      {
        label: "Spending",
        type: "line",
        data: chartArray.length > 0 && chartArray.map((e) => e.spending),
        borderColor: "#B261E3",
        backgroundColor: "#B261E3",
        pointHoverBorderWidth: 2,
        hoverBackgroundColor: "white",
        pointHoverBorderColor: "#B261E3",
      },
      {
        label: "Sales",
        data: chartArray.length > 0 && chartArray.map((e) => e.sales),
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: ["rgb(54, 162, 235)"],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    setFirstDate(
      new Date(currentMonth?.getFullYear(), currentMonth?.getMonth(), 1)
    );
    setLastDate(
      new Date(currentMonth?.getFullYear(), currentMonth?.getMonth() + 1, 0)
    );
    let currentMonName = new Date(currentMonth);
    setMonth(
      `${currentMonName.toLocaleString("en-US", {
        month: "long",
      })} ${currentMonName.getFullYear()} `
    );
  }, [currentMonth]);

  return (
    <>
      <h3>{month}</h3>
      <Bar data={data} options={options} />
    </>
  );
};

export default SalesChart;
