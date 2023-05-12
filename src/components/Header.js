import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { MDBContainer } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/all-actions/AuthAction";

function Header() {
  let dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState([]);
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  let allInventoryData = useSelector(({ InventoryState }) => {
    return InventoryState.allInventories;
  });

  useEffect(() => {
    let filter =
      allInventoryData && allInventoryData.filter((e) => e.seen === false);
    setNotificationData(filter);
  });

  return (
    <>
      <header>
        <MDBContainer>
          <div className="logo-text">
            <NavLink to={"/"}>
              <h2>Sale Dashboard</h2>
            </NavLink>
          </div>

          <div className="navBar">
            <ul>
              <li>
                <NavLink to={"/"}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to={"/data"}>Data</NavLink>
              </li>
              {authUser.role === "Accounts" || authUser.role === "Admin" ? (
                <li>
                  <NavLink to={"/inventory"}>Inventory</NavLink>
                </li>
              ) : null}
              <li>
                <NavLink to={"/vendors"}>Vendors</NavLink>
              </li>
              {authUser.role === "Admin" && (
                <>
                  <li>
                    <NavLink to={"/users"}>Users</NavLink>
                  </li>
                  {notificationData.length > 0 && (
                    <li>
                      <Link>
                        Notification
                        <span className="notiCounter">
                          {notificationData.length}
                        </span>
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
          <div className="admin-info">
            <div className={"flex"}>
              <h2 className="name">
                Hi! <span>{authUser && authUser.name}</span>
              </h2>
              <p>{authUser && authUser.role}</p>
            </div>
            <div className="userLogout">
              <NavLink
                to={"/"}
                className="logout"
                onClick={() => dispatch(logoutUser())}
              >
                <RiLogoutCircleRLine />
              </NavLink>
            </div>
            {/* {authUser && authUser.role === "Admin" && (
              <div className="notification hdrIcon">
                <NavLink to={"/"} className="notify">
                  <FaRegBell />
                </NavLink>
              </div>
            )} */}
          </div>
        </MDBContainer>
      </header>
    </>
  );
}

export default Header;
