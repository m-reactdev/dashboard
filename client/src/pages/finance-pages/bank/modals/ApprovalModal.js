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
import { useSelector } from "react-redux";

const ApprovalModal = (props) => {
  // Get modal and dispatch & Auth User
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let { invItem, approvalModal, setApprovalModal } = props;

  // Clear form and close modal functions
  const closeModal = () => {
    setApprovalModal(!approvalModal);
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
                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>Transaction Type</h5>
                      <p>{invItem && invItem.type}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={6} md={6}>
                    <div className="view_item_box">
                      <h5>Bank Reference</h5>
                      <p>{invItem && invItem.refId}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>Date</h5>
                      <p>{invItem && invItem.date}</p>
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

                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>Amount</h5>
                      <p>{invItem && invItem.amount.toLocaleString("en-US")}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={12}>
                    <div className="view_item_box">
                      <h5>Description</h5>
                      <p>{invItem && invItem.description}</p>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ApprovalModal;
