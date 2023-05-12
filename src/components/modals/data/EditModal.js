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
    sales: 0,
    chargeBack: 0,
    spending: 0,
    smm: 0,
    ppc: 0,
    description: "Lorem Ipsum",
    email: "waleed#gmail.com",
    name: "Waleed Ahmed",
  });

  let { sales, chargeBack, spending, smm, ppc, description, email, name } =
    dataEntry;

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
                    type="number"
                    label="Sale Amount"
                    name="sales"
                    value={sales}
                    changeValue={handleChange}
                    col={6}
                    text={true}
                  />
                  <ModalInput
                    type="number"
                    label="Chargeback/Refund"
                    name="chargeBack"
                    value={chargeBack}
                    changeValue={handleChange}
                    col={6}
                    text={true}
                  />
                  <ModalInput
                    type="number"
                    name="spending"
                    label="Spendings"
                    value={spending}
                    changeValue={handleChange}
                    col={6}
                    text={true}
                  />
                  <ModalInput
                    type="number"
                    label="SMM"
                    name="smm"
                    value={smm}
                    changeValue={handleChange}
                    col={6}
                    text={true}
                  />
                  <ModalInput
                    type="number"
                    label="PPC"
                    name="ppc"
                    value={ppc}
                    changeValue={handleChange}
                    col={6}
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
