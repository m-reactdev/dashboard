import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { ModalInput } from "../../InputField";
import { DateMonthYearPicker } from "../../datepicker/DateMonthYearPicker";

const CreateModal = (props) => {
  let { createModal, setCreateModal } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [dataEntry, setDataEntry] = useState({
    paymentType: "",
    payment: 0,
    description: "",
    email: "waleed#gmail.com",
    name: "Waleed Ahmed",
  });

  let { paymentType, payment, description, email, name } = dataEntry;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={createModal} setShow={setCreateModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Vendor Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setCreateModal(!createModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <MDBRow>
                  <MDBCol lg={6}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
                      handleChange={(e) => setStartDate(e)}
                      startDate={startDate}
                    />
                  </MDBCol>
                  <ModalInput
                    type="text"
                    label="Payment Type"
                    name="paymentType"
                    value={paymentType}
                    changeValue={handleChange}
                    col={6}
                  />
                  <ModalInput
                    type="number"
                    label="Payment"
                    name="payment"
                    value={payment}
                    changeValue={handleChange}
                    col={12}
                    text={true}
                  />
                  <ModalInput
                    label="Description"
                    name="description"
                    value={description}
                    changeValue={handleChange}
                    col={12}
                    textarea={true}
                  />
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setCreateModal(!createModal)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn>Create</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
