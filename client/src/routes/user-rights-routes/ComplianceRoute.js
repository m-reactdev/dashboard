import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Home from "../../pages/home-page/Home";
import Compliance from "../../pages/compliance-page/Compliance";

const ComplianceRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/compliance`} element={<Compliance />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default ComplianceRoute;
