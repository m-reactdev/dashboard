import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MDBContainer } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/actions/all-actions/AuthAction";
import FinanceNavbar from "./header-navbar/FinanceNavbar";
import MainNavbar from "./header-navbar/MainNavbar";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import AdminNavbar from "./header-navbar/AdminNavbar";
import SalesNavbar from "./header-navbar/SalesNavbar";
import MarketingNavbar from "./header-navbar/MarketingNavbar";
import ComplianceNavbar from "./header-navbar/ComplianceNavbar";
import NoRightsNavbar from "./header-navbar/NoRightsNavbar";

import io from "socket.io-client";
import { BASE_URL } from "../../config/BASE_URL";
var socket = io(BASE_URL, { transports: ["websocket"] });

function Header() {
  let dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  return (
    <>
      <header>
        <MDBContainer>
          <div className="logo-text">
            <div className={openMenu ? "menuBar show" : "menuBar"}>
              <Link onClick={() => setOpenMenu(!openMenu)}>
                <h2>
                  {openMenu ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
                </h2>
              </Link>
            </div>
            <div className="logo">
              <NavLink to={""}>
                <h2>Sale Dashboard</h2>
              </NavLink>
            </div>
          </div>
          {openMenu && (
            <>
              <div
                className="overlape"
                onClick={() => setOpenMenu(!openMenu)}
              ></div>
              <div className="fixed_navbar">
                <div className="logo">
                  <NavLink to={""}>
                    <h2>Sale Dashboard</h2>
                  </NavLink>
                </div>
                <div className="navBar">
                  {authUser && authUser.userRights.length > 0 ? (
                    <>
                      {authUser.userRights.indexOf("Finance") > -1 ||
                      authUser.userRights?.indexOf("Accounts") > -1 ? (
                        <FinanceNavbar com={() => setOpenMenu(!openMenu)} />
                      ) : authUser.userRights?.indexOf("Admin") > -1 ? (
                        <AdminNavbar com={() => setOpenMenu(!openMenu)} />
                      ) : authUser.userRights?.indexOf("Sales") > -1 ? (
                        <SalesNavbar com={() => setOpenMenu(!openMenu)} />
                      ) : authUser.userRights?.indexOf("Marketing") > -1 ? (
                        <MarketingNavbar com={() => setOpenMenu(!openMenu)} />
                      ) : authUser.userRights?.indexOf("Compliance") > -1 ? (
                        <ComplianceNavbar com={() => setOpenMenu(!openMenu)} />
                      ) : (
                        <MainNavbar com={() => setOpenMenu(!openMenu)} />
                      )}
                    </>
                  ) : (
                    <NoRightsNavbar />
                  )}
                </div>
              </div>
            </>
          )}

          <div className="admin-info">
            <div className={"flex"}>
              <h2 className="name">
                <span>{authUser && authUser.name}</span>
              </h2>
              <p>{authUser && authUser.role && authUser.role}</p>
            </div>
            <div className="userLogout">
              <NavLink
                to={"/"}
                className="logout"
                onClick={() => dispatch(logoutUser(authUser, socket))}
              >
                <RiLogoutCircleRLine />
              </NavLink>
            </div>
          </div>
        </MDBContainer>
      </header>
    </>
  );
}

export default Header;
