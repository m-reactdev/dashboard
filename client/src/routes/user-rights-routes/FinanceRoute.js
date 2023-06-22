import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Construction from "../../pages/Construction";
import Bank from "../../pages/finance-pages/bank/Bank";
import Budget from "../../pages/finance-pages/budget/Budget";
import Dashboard from "../../pages/finance-pages/Dashboard";
import Billing from "../../pages/finance-pages/expenses/billing/Billing";
import Expenses from "../../pages/finance-pages/expenses/Expenses";
import PettyCash from "../../pages/finance-pages/expenses/pettycash/PettyCash";
import Rentack from "../../pages/finance-pages/expenses/rentack/Rentack";
import Vendors from "../../pages/finance-pages/expenses/vendors/Vendors";
import Inventory from "../../pages/inventory-page/Inventory";

const FinanceRoute = () => {
  const [siteDown, setSiteDown] = useState(false);
  return (
    <>
      <Header />
      {siteDown ? (
        <Routes>
          <Route path={`/`} element={<Construction />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={`/`} element={<Dashboard />} />
          <Route path={`/bank`} element={<Bank />} />
          <Route path={`/budget`} element={<Budget />} />
          <Route path={`/expenses`} element={<Expenses />} />
          {/* <Route path={`/petty-cash`} element={<PettyCash />} />
          <Route path={`/rentack`} element={<Rentack />} />
          <Route path={`/vendors`} element={<Vendors />} /> */}
          {/* <Route path={`/inventory`} element={<Expenses />} /> */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
      <Footer />
    </>
  );
};

export default FinanceRoute;
