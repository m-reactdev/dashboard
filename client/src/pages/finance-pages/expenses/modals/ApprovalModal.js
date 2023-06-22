import React, { useRef, useState, useFocus } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { updateExpense } from "../../../../store/actions/all-actions/finance-actions/ExpensesAction";

import io from "socket.io-client";
import { BASE_URL } from "../../../../components/config/BASE_URL";
var socket = io(BASE_URL, { transports: ["websocket"] });

const ApprovalModal = (props) => {
  // Get modal and dispatch & Auth User
  const refText = useRef(null);
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let {
    invItem,
    updateRejectedDescription,
    setUpdateRejectedDescription,
    approvalModal,
    setApprovalModal,
  } = props;

  // Clear form and close modal functions
  const clearForm = () => {
    setUpdateRejectedDescription("");
  };
  const closeModal = () => {
    setApprovalModal(!approvalModal);
    clearForm();
  };

  // Rejected function
  const rejectedHandler = () => {
    let updateData = {
      _id: invItem && invItem._id,
      amount: invItem && invItem.amount,
      description: invItem && invItem.description,
      pdfFile: invItem && invItem.pdfFile,
      fileName: invItem && invItem.fileName,
      email: invItem && invItem.email,
      name: invItem && invItem.name,
      rejectedDescription: updateRejectedDescription,
      type: invItem && invItem.type,
      status: "Rejected",
      timeStamp: invItem && invItem.timeStamp,
      date: invItem && invItem.date,
      code: invItem && invItem.code,
      seen: true,
    };

    if (updateData.rejectedDescription !== "" && updateData.status !== "") {
      dispatch(updateExpense(updateData, closeModal, authUser, socket));
    } else {
      refText.current.focus();
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
  };

  // Approved function
  const approvedHandler = () => {
    let updateData = {
      _id: invItem && invItem._id,
      amount: invItem && invItem.amount,
      description: invItem && invItem.description,
      pdfFile: invItem && invItem.pdfFile,
      fileName: invItem && invItem.fileName,
      email: invItem && invItem.email,
      name: invItem && invItem.name,
      rejectedDescription: "",
      type: invItem && invItem.type,
      status: "Approved",
      timeStamp: invItem && invItem.timeStamp,
      date: invItem && invItem.date,
      code: invItem && invItem.code,
      seen: true,
    };

    if (updateData.status !== "") {
      dispatch(updateExpense(updateData, closeModal, authUser, socket));
    }
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={approvalModal} setShow={setApprovalModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>View Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <MDBRow>
                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>ID</h5>
                      <p style={{ textTransform: "uppercase" }}>
                        {invItem && invItem.code}
                        {invItem && invItem._id.slice(-2)}
                      </p>
                    </div>
                  </MDBCol>

                  <MDBCol
                    lg={authUser && authUser.access === true ? 3 : 9}
                    md={6}
                  >
                    <div className="view_item_box">
                      <h5>Account Type</h5>
                      <p>{invItem && invItem.type}</p>
                    </div>
                  </MDBCol>

                  {authUser && authUser.access === true && (
                    <>
                      <MDBCol lg={3} md={6}>
                        <div className="view_item_box">
                          <h5>Name</h5>
                          <p>{invItem && invItem.name}</p>
                        </div>
                      </MDBCol>
                      <MDBCol lg={3} md={6}>
                        <div className="view_item_box">
                          <h5>TimeStamp</h5>
                          <p>{invItem && invItem.timeStamp}</p>
                        </div>
                      </MDBCol>
                    </>
                  )}

                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>Date</h5>
                      <p>{invItem && invItem.date}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>Amount</h5>
                      <p>{invItem && invItem.amount.toLocaleString("en-US")}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>Status</h5>
                      <p
                        style={{
                          color:
                            invItem && invItem.status === "Rejected"
                              ? "red"
                              : invItem && invItem.status === "Approved"
                              ? "green"
                              : invItem && invItem.status === "Billed"
                              ? "#ed492c"
                              : "#333",
                        }}
                      >
                        {invItem && invItem.status}
                      </p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={12}>
                    <div className="view_item_box">
                      <h5>File</h5>
                      <p>
                        <Link
                          to={invItem && invItem.pdfFile}
                          target="_blank"
                          download
                        >
                          {invItem && invItem.fileName}
                        </Link>
                      </p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={12}>
                    <div className="view_item_box">
                      <h5>Description</h5>
                      <p>{invItem && invItem.description}</p>
                    </div>
                  </MDBCol>

                  {authUser && authUser.access === true && (
                    <MDBCol lg={12}>
                      <div className="view_item_box">
                        <h5>Reason of Rejection</h5>
                        <textarea
                          onChange={(e) =>
                            setUpdateRejectedDescription(e.target.value)
                          }
                          value={updateRejectedDescription}
                          name="updateRejectedDescription"
                          className="form-control"
                          cols="30"
                          rows="10"
                          maxLength={250}
                          ref={refText}
                        ></textarea>
                      </div>
                    </MDBCol>
                  )}
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>
              {authUser && authUser.access === true && (
                <>
                  <MDBBtn onClick={rejectedHandler}>Reject</MDBBtn>
                  <MDBBtn color="success" onClick={approvedHandler}>
                    Approve
                  </MDBBtn>
                </>
              )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ApprovalModal;
