import React from "react";
import { NavLink } from "react-router-dom";

const FinanceNavbar = ({ com }) => {
  return (
    <>
      <ul>
        <li>
          <NavLink onClick={com} to={"/"}>
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
        {/* <li>
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
        </li> */}
        <li>
          <NavLink onClick={com} to={"/expenses"}>
            Expenses
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default FinanceNavbar;
