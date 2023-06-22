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
import { useDispatch, useSelector } from "react-redux";
import { inventoryUpdate } from "../../../store/actions/all-actions/InventoryAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ApprovalModal = (props) => {
  // Get modal and dispatch & Auth User
  const ref = useRef(null);
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let {
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
    date,
    code,
  } = inventoryData;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setInventoryData({
      rejectedDescription: "",
    });
  };
  const closeModal = () => {
    setApprovalModal(!approvalModal);
    clearForm();
  };

  // Inventory reject function
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
      date: date,
    };

    if (
      authUser.userRights.indexOf("Super Admin") > -1 ||
      authUser.userRights.indexOf("Developer") > -1
    ) {
      if (updateData.rejectedDescription !== "" && updateData.status !== "") {
        dispatch(inventoryUpdate(updateData, closeModal));
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

  // Inventory approve function
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
      date: date,
    };

    if (
      authUser.userRights.indexOf("Super Admin") > -1 ||
      authUser.userRights.indexOf("Developer") > -1
    ) {
      dispatch(inventoryUpdate(updateData, closeModal));
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
                        {code}
                        {_id && _id.slice(-2)}
                      </p>
                    </div>
                  </MDBCol>
                  {authUser.userRights.indexOf("Super Admin") > -1 ||
                  authUser.userRights.indexOf("Developer") > -1 ? (
                    <>
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
                    </>
                  ) : null}

                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>Date</h5>
                      <p>{date}</p>
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

                  {authUser.userRights.indexOf("Super Admin") > -1 ||
                  authUser.userRights.indexOf("Developer") > -1 ? (
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
                  ) : null}
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>
              {authUser.userRights.indexOf("Super Admin") > -1 ||
              authUser.userRights.indexOf("Developer") > -1 ? (
                <>
                  <MDBBtn onClick={rejectInventoryHandler}>Reject</MDBBtn>
                  <MDBBtn color="success" onClick={approveInventoryHandler}>
                    Approve
                  </MDBBtn>
                </>
              ) : null}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ApprovalModal;
