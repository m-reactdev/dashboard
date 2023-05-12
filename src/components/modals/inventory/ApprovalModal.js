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
import { ModalInput } from "../../InputField";
import { MonthYearPicker } from "../../datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import PDF from "../../../assets/imgs/pdf.png";

import {
  fetchInventory,
  inventoryUpdate,
} from "../../../store/actions/all-actions/InventoryAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ApprovalModal = (props) => {
  const ref = useRef(null);
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let {
    updateDate,
    updatePdfFile,
    inventoryData,
    setInventoryData,
    approvalModal,
    setApprovalModal,
    updatedFileName,
  } = props;

  let {
    _id,
    amount,
    description,
    email,
    name,
    status,
    timeStamp,
    rejectedDescription,
  } = inventoryData;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInventoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setInventoryData({
      rejectedDescription: "",
    });
  };

  const closeModal = () => {
    setApprovalModal(!approvalModal);
    clearForm();
  };

  const rejectInventoryHandler = () => {
    let updateData = {
      _id: _id,
      amount: amount,
      description: description,
      pdfFile: updatePdfFile,
      fileName: updatedFileName,
      email: email,
      name: name,
      rejectedDescription: rejectedDescription,
      status: "Rejected",
      timeStamp: timeStamp,
      monthYear: updateDate.toLocaleDateString(),
    };

    if (authUser.role === "Admin") {
      if (updateData.rejectedDescription !== "" && updateData.status !== "") {
        dispatch(inventoryUpdate(updateData, closeModal));
        dispatch(fetchInventory());
      } else {
        ref.current.focus();
        toast.error("Please fill rejection reason.", {
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
    }
  };

  const approveInventoryHandler = () => {
    let updateData = {
      _id: _id,
      amount: amount,
      description: description,
      pdfFile: updatePdfFile,
      fileName: updatedFileName,
      email: email,
      name: name,
      rejectedDescription: "",
      status: "Approved",
      timeStamp: timeStamp,
      monthYear: updateDate.toLocaleDateString(),
    };

    if (authUser.role === "Admin" && updateData.status === "Approved") {
      dispatch(inventoryUpdate(updateData, closeModal));
      dispatch(fetchInventory());
    }
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={approvalModal} setShow={setApprovalModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>View Inventory</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setApprovalModal(!approvalModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <MDBRow>
                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>ID</h5>
                      <p style={{ textTransform: "uppercase" }}>
                        IN{_id && _id.slice(-2)}
                      </p>
                    </div>
                  </MDBCol>
                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>Name</h5>
                      <p>{name}</p>
                    </div>
                  </MDBCol>
                  <MDBCol lg={6} md={6}>
                    <div className="view_item_box">
                      <h5>TimeStamp</h5>
                      <p>{timeStamp}</p>
                    </div>
                  </MDBCol>
                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>Month</h5>
                      <p>
                        {updateDate ? months[updateDate.getMonth()] : ""},
                        {updateDate ? updateDate.getFullYear() : ""}
                      </p>
                    </div>
                  </MDBCol>
                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>Amount</h5>
                      <p>${amount}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>Status</h5>
                      <p
                        style={{
                          color:
                            status === "Rejected"
                              ? "red"
                              : status === "Approved"
                              ? "green"
                              : "#333",
                        }}
                      >
                        {status && status}
                      </p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>File</h5>
                      <p>
                        <Link to={updatePdfFile} target="_blank" download>
                          {updatedFileName}
                        </Link>
                      </p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={12}>
                    <div className="view_item_box">
                      <h5>Description</h5>
                      <p>{description}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={12}>
                    <div className="view_item_box">
                      <h5>Reason of Rejection</h5>
                      <textarea
                        onChange={handleChange}
                        value={rejectedDescription}
                        name="rejectedDescription"
                        className="form-control"
                        cols="30"
                        rows="10"
                        maxLength={250}
                        ref={ref}
                      ></textarea>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setApprovalModal(!approvalModal)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn onClick={rejectInventoryHandler}>Reject</MDBBtn>
              <MDBBtn color="success" onClick={approveInventoryHandler}>
                Approve
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ApprovalModal;
