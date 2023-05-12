import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Data from "../pages/Data";
import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Vendors from "../pages/Vendors";

const Navigation = () => {
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  console.log(authUser);

  return (
    <>
      <Router>
        {authUser ? (
          <>
            <Header />
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/data"} element={<Data />} />
              <Route path={"/inventory"} element={<Inventory />} />
              <Route path={"/vendors"} element={<Vendors />} />
              <Route path={"/users"} element={<Users />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path={"/"} element={<Login />} />
            {/* <Route path={"/register"} element={<Register />} /> */}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
      <ToastContainer />
    </>
  );
};

export default Navigation;
