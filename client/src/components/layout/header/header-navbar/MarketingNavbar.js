import React from "react";
import { NavLink } from "react-router-dom";

const MarketingNavbar = ({ com }) => {
  return (
    <>
      <ul>
        <li>
          <NavLink onClick={com} to={"/"}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink onClick={com} to={"/marketing"}>
            Marketing
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default MarketingNavbar;
