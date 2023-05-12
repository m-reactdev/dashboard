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

const EditModal = (props) => {
  let { editModal, setEditModal } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [dataEntry, setDataEntry] = useState({
    paymentType: "Design",
    payment: 99,
    date: "12-12-2020",
    description: "Lorem Ipsum",
    email: "waleed#gmail.com",
    name: "Waleed Ahmed",
  });

  let { paymentType, payment, date, description, email, name } = dataEntry;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={editModal} setShow={setEditModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setEditModal(!editModal)}
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
                    text={true}
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
                onClick={() => setEditModal(!editModal)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn>Update</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
