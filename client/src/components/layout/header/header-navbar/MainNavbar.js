import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const MainNavbar = ({ com }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <ul>
        <li>
          <NavLink onClick={com} to={"/"}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/master-data"}>
            Master Data
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/sales"}>
            Sales
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/us-vendors"}>
            Us Vendors
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/marketing"}>
            Marketing
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/compliance"}>
            Compliance
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/inventory"}>
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/sales-target"}>
            Sales Target
          </NavLink>
        </li>
        <li>
          <Link onClick={() => setShow(!show)}>
            Finance{" "}
            <span>{!show ? <AiFillCaretDown /> : <AiFillCaretUp />}</span>
          </Link>
          {show && (
            <div className="dropDown">
              <ul>
                <li>
                  <NavLink onClick={com} to={"/finance/dashboard"}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={com} to={"/bank"}>
                    Bank
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={com} to={"/budget"}>
                    Budget
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={com} to={"/expense"}>
                    Expense
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={com} to={"/billing"}>
                    Billing
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={com} to={"/petty-cash"}>
                    Petty Cash
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={com} to={"/rentack"}>
                    Rentack
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={com} to={"/vendors"}>
                    Vendors
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li>
          <NavLink onClick={com} to={"/users"}>
            Users
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default MainNavbar;
