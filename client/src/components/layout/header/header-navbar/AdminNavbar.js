import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = ({ com }) => {
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
          <NavLink onClick={com} to={"/sales-target"}>
            Sales Target
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminNavbar;
