import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import NoRightsDashboard from "../../pages/NoRightsDashboard";

const NoRightsRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={`/`} element={<NoRightsDashboard />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default NoRightsRoute;
