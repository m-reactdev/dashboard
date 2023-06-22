import React, { useRef, useState } from "react";
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
import { ModalInput, SelectField } from "../../../components/InputField";
import { DateMonthYearPicker } from "../../../components/datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { complianceUpdated } from "../../../store/actions/all-actions/ComplianceAction";
import { complianceOption } from "../../../components/config/SelectFieldOptions";

const EditModal = (props) => {
  // Get modal and dispatch & Auth User
  let dispatch = useDispatch();

  let {
    invItem,
    updateDate,
    setUpdateDate,
    typeUpdate,
    setTypeUpdate,
    complianceUpdate,
    setComplianceUpdate,
    editModal,
    setEditModal,
  } = props;

  let { description, amount } = complianceUpdate;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplianceUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setComplianceUpdate({
      amount: 0,
      description: "",
    });
    setUpdateDate(new Date());
    setTypeUpdate(null);
  };
  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  // Compliance update function
  const updateComplianceHandler = () => {
    let updateData = {
      _id: invItem?._id,
      compliance: {
        chargeback:
          typeUpdate && typeUpdate.value === "Chargeback" ? amount : 0,
        refund: typeUpdate && typeUpdate.value === "Refund" ? amount : 0,
        casewin: typeUpdate && typeUpdate.value === "CaseWin" ? amount : 0,
        caseloss: typeUpdate && typeUpdate.value === "CaseLoss" ? amount : 0,
      },
      description: description,
      email: invItem?.email,
      name: invItem?.name,
      timeStamp: new Date().toLocaleString(),
      date: updateDate.toLocaleDateString(),
      code: invItem?.code,
      type: typeUpdate && typeUpdate.value,
    };

    if (
      updateData.amount !== 0 &&
      updateData.description !== "" &&
      updateData.date !== "" &&
      updateData.type !== ""
    ) {
      dispatch(complianceUpdated(updateData, closeModal));
    } else {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={editModal} setShow={setEditModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <MDBRow>
                  <MDBCol lg={4}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
                      handleChange={(e) => setUpdateDate(e)}
                      startDate={updateDate}
                    />
                  </MDBCol>
                  <MDBCol lg={4}>
                    <label htmlFor="">Type</label>
                    <SelectField
                      clsName={true}
                      value={typeUpdate}
                      changeValue={(e) => setTypeUpdate(e)}
                      roleOptions={complianceOption}
                      placeholder={"Select Type"}
                    />
                  </MDBCol>
                  <ModalInput
                    type="number"
                    label="Amount"
                    name="amount"
                    value={amount}
                    changeValue={handleChange}
                    col={4}
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
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={updateComplianceHandler}>Update</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
