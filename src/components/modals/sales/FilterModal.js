import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { SelectField } from "../../InputField";

function FilterModal(props) {
  let {
    filterModal,
    setFilterModal,
    year,
    setYear,
    yearOptions,
    month,
    setMonth,
    monthOptions,
  } = props;
  return (
    <>
      <MDBModal tabIndex="-1" show={filterModal} setShow={setFilterModal}>
        <MDBModalDialog centered size="fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Search</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setFilterModal(!filterModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="filter_Section">
                <SelectField
                  value={year}
                  changeValue={(e) => setYear(e)}
                  roleOptions={yearOptions}
                  placeholder="Select Year"
                />
                <SelectField
                  value={month}
                  changeValue={(e) => setMonth(e)}
                  roleOptions={monthOptions}
                  placeholder="Select Month"
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setFilterModal(!filterModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn>Filter</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default FilterModal;
