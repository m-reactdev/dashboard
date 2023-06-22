import React from "react";
import { NavLink } from "react-router-dom";

const ComplianceNavbar = ({ com }) => {
  return (
    <>
      <ul>
        <li>
          <NavLink onClick={com} to={"/"}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/compliance"}>
            Compliance
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default ComplianceNavbar;
