import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Home from "../../pages/home-page/Home";
import Marketing from "../../pages/marketing/Marketing";

const MarketingRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/marketing`} element={<Marketing />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MarketingRoute;
