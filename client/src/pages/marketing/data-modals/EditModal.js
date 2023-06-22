import React, { useEffect, useState } from "react";
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
import { ModalInput } from "../../../components/InputField";
import { DateMonthYearPicker } from "../../../components/datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatedMarketing } from "../../../store/actions/all-actions/MarketingAction";

const EditModal = (props) => {
  // Get modal and dispatch & Auth User
  let dispatch = useDispatch();

  let {
    invItem,
    updateDate,
    setUpdateDate,
    updateData,
    setUpdateData,
    editModal,
    setEditModal,
  } = props;

  let { description, amount } = updateData;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setUpdateData({
      amount: 0,
      description: "",
    });
    setUpdateDate(new Date());
  };
  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  // Sale update function
  const updateSaleHandler = () => {
    let updateData = {
      _id: invItem?._id,
      amount: amount,
      description: description,
      email: invItem?.email,
      name: invItem?.name,
      timeStamp: new Date().toLocaleString(),
      date: updateDate.toLocaleDateString(),
      code: "MRKT",
    };

    if (
      updateData.amount !== 0 &&
      updateData.description !== "" &&
      updateData.date !== ""
    ) {
      dispatch(updatedMarketing(updateData, closeModal));
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
                      handleChange={(e) => setUpdateDate(e)}
                      startDate={updateDate}
                    />
                  </MDBCol>
                  <ModalInput
                    type="number"
                    label="Amount"
                    name="amount"
                    value={amount}
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
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={updateSaleHandler}>Update</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
