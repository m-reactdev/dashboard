import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Home from "../../pages/home-page/Home";
import Compliance from "../../pages/compliance-page/Compliance";
import Inventory from "../../pages/inventory-page/Inventory";
import Marketing from "../../pages/marketing/Marketing";
import MasterData from "../../pages/master-data-pages/MasterData";
import SalesTarget from "../../pages/sales-target-page/SalesTarget";
import Sales from "../../pages/sales/Sales";
import Users from "../../pages/users-page/Users";
import UsVendors from "../../pages/vendor-page/Vendors";
import Bank from "../../pages/finance-pages/bank/Bank";
import Budget from "../../pages/finance-pages/budget/Budget";
import Dashboard from "../../pages/finance-pages/Dashboard";
import Billing from "../../pages/finance-pages/expenses/billing/Billing";
import PettyCash from "../../pages/finance-pages/expenses/pettycash/PettyCash";
import Rentack from "../../pages/finance-pages/expenses/rentack/Rentack";
import Vendors from "../../pages/finance-pages/expenses/vendors/Vendors";
import Expenses from "../../pages/finance-pages/expenses/Expenses";

const MainRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/master-data`} element={<MasterData />} />
        <Route path={`/sales`} element={<Sales />} />
        <Route path={`/us-vendors`} element={<UsVendors />} />
        <Route path={`/marketing`} element={<Marketing />} />
        <Route path={`/compliance`} element={<Compliance />} />
        <Route path={`/inventory`} element={<Inventory />} />
        <Route path={`/sales-target`} element={<SalesTarget />} />
        <Route path={`/users`} element={<Users />} />
        <Route path={`/finance/dashboard`} element={<Dashboard />} />
        <Route path={`/bank`} element={<Bank />} />
        <Route path={`/budget`} element={<Budget />} />
        <Route path={`/billing`} element={<Billing />} />
        <Route path={`/petty-cash`} element={<PettyCash />} />
        <Route path={`/rentack`} element={<Rentack />} />
        <Route path={`/vendors`} element={<Vendors />} />
        <Route path={`/expense`} element={<Expenses />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainRoutes;
