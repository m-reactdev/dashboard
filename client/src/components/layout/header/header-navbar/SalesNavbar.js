import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const SalesNavbar = ({ com }) => {
  return (
    <>
      <ul>
        <li>
          <NavLink onClick={com} to={"/"}>
            Dashboard
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
      </ul>
    </>
  );
};

export default SalesNavbar;
