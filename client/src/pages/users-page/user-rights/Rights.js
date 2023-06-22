import React, { useState } from "react";
import { MDBCheckbox, MDBCol } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

const Rights = ({ handleChange, item }) => {
  const [role, setRole] = useState([
    "Super Admin",
    "Admin",
    "Developer",
    "Master Data",
    "Us Vendors",
    "Sales",
    "Marketing",
    "Compliance",
    "Sales Target",
    "Inventory",
    // "Bank",
    // "Petty Cash",
    // "Vendors",
    // "Billing",
    // "Budget",
    // "Rentack",
    "Finance",
    "Accounts",
  ]);

  return (
    <>
      <MDBCol lg={2}>
        <div className="form_block">
          {role?.map((role, index) => {
            return (
              <div className="selectRole" key={index}>
                <MDBCheckbox
                  name="flexCheck"
                  value={role}
                  id={index}
                  label={role}
                  onChange={(e) => handleChange(e)}
                  defaultChecked={item?.indexOf(role) > -1}
                />
              </div>
            );
          })}
        </div>
      </MDBCol>
    </>
  );
};

export default Rights;
