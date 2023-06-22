import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../pages/auth-pages/Login";
import FinanceRoute from "./user-rights-routes/FinanceRoute";
import MainRoutes from "./user-rights-routes/MainRoutes";
import AdminRoute from "./user-rights-routes/AdminRoute";
import SalesRoute from "./user-rights-routes/SalesRoute";
import MarketingRoute from "./user-rights-routes/MarketingRoute";
import ComplianceRoute from "./user-rights-routes/ComplianceRoute";
import NoRightsDashboard from "./user-rights-routes/NoRightsRoute";

const Navigation = () => {
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  console.log(authUser);

  return (
    <>
      <Router>
        {authUser !== null ? (
          <>
            {authUser.userRights.length > 0 ? (
              <>
                {authUser.userRights?.indexOf("Finance") > -1 ||
                authUser.userRights?.indexOf("Accounts") > -1 ? (
                  <FinanceRoute />
                ) : authUser.userRights?.indexOf("Admin") > -1 ? (
                  <AdminRoute />
                ) : authUser.userRights?.indexOf("Sales") > -1 ? (
                  <SalesRoute />
                ) : authUser.userRights?.indexOf("Marketing") > -1 ? (
                  <MarketingRoute />
                ) : authUser.userRights?.indexOf("Compliance") > -1 ? (
                  <ComplianceRoute />
                ) : (
                  <MainRoutes />
                )}
              </>
            ) : (
              <NoRightsDashboard />
            )}
          </>
        ) : (
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
      <ToastContainer />
    </>
  );
};

export default Navigation;
