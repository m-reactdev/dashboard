import React from "react";
import { NavLink } from "react-router-dom";

const NoRightsNavbar = ({ com }) => {
  return (
    <>
      <ul>
        <li>
          <NavLink onClick={com} to={"/"}>
            Dashboard
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NoRightsNavbar;
