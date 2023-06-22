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
import UsVendors from "../../pages/vendor-page/Vendors";

const AdminRoute = () => {
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
        <Route path={`/sales-target`} element={<SalesTarget />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AdminRoute;
