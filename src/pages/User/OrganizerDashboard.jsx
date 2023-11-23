import React, { useState } from "react";
import { Chart } from "react-google-charts";
import PieChart from "../../components/common/PieChart";
import BarChartVertical from "../../components/common/BarChartVertical";
import LineChart from "../../components/common/LineChart";
import OverviewBlock from "../../components/common/OverviewBlock";
import useFetchData from "../../hooks/useFetchData";
import {
  getOrganizerDashboardBarChartData,
  getOrganizerDashboardOverviewData,
} from "../../api/index";
import { useParams } from "react-router-dom";
const OrganizerDashboard = () => {
  const { organizerId } = useParams();
  const { data: chartData } = useFetchData(
    ["organizer-dashboard-bardata", organizerId],
    () => getOrganizerDashboardBarChartData(organizerId)
  );

  const { data: overviewData } = useFetchData(
    ["organizer-dashboard-overview", organizerId],
    () => getOrganizerDashboardOverviewData(organizerId)
  );
  const pieChartData = [
    ["Color", "Tickets"],
    ["Kpay", 20],
    ["Wave", 15],
    ["A+", 3],
    ["AYA Pay", 5],
  ];

  const lineData = [
    ["Week", "Sales", "Expenses"],
    ["week1", 1000, 400],
    ["week2", 1170, 460],
    ["week3", 660, 1120],
    ["week4", 1030, 540],
  ];

  return (
    <>
      <h1 className="text-3xl mx-auto p-4 text-center">Organizer Dashboard</h1>
      <div className="bg-white rounded-2xl text-primary  grid grid-cols-2  p-8 mx-auto w-[85%] border-2 border-gray-900 min-h-[90vh] max-h-fit">
        <div>
          <h2 className="text-xl">Total Tickets Sell - Bar Chart</h2>
          {chartData && (
            <BarChartVertical barDataProps={chartData.totalTicketSaleByType} />
          )}
        </div>
        <div className="text-black p-3 h-fit">
          <h2 className="text-xl">Pie Chart Example</h2>
          {chartData && (
            <PieChart pieChartData={chartData.toalTicketByPayment} />
          )}
        </div>
        <div className="text-black  h-fit">
          <h2 className="text-xl">Line Chart</h2>
          {chartData && (
            <LineChart lineData={chartData.totalTicketSaleByEvent} />
          )}
        </div>
        <div className="text-black  h-fit">
          <h2 className="text-xl">Overview</h2>
          {overviewData && <OverviewBlock overviewData={overviewData} />}
        </div>
      </div>
    </>
  );
};

export default OrganizerDashboard;
