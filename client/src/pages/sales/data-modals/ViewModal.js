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

const ViewModal = (props) => {
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let { invItem, viewModal, setViewModal } = props;

  return (
    <>
      <MDBModal tabIndex="-1" show={viewModal} setShow={setViewModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>View Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setViewModal(!viewModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <MDBRow>
                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>ID</h5>
                      <p style={{ textTransform: "uppercase" }}>
                        {invItem !== null && invItem.code}
                        {invItem !== null && invItem._id.slice(-2)}
                      </p>
                    </div>
                  </MDBCol>
                  {authUser.userRights.indexOf("Super Admin") > -1 ||
                  authUser.userRights.indexOf("Admin") > -1 ||
                  authUser.userRights.indexOf("Developer") > -1 ? (
                    <>
                      <MDBCol lg={3} md={6}>
                        <div className="view_item_box">
                          <h5>Name</h5>
                          <p>{invItem !== null && invItem.name}</p>
                        </div>
                      </MDBCol>
                      <MDBCol lg={6} md={6}>
                        <div className="view_item_box">
                          <h5>TimeStamp</h5>
                          <p>{invItem !== null && invItem.timeStamp}</p>
                        </div>
                      </MDBCol>
                    </>
                  ) : null}
                  <MDBCol lg={3} md={6}>
                    <div className="view_item_box">
                      <h5>Date</h5>
                      <p>{invItem !== null && invItem.date}</p>
                    </div>
                  </MDBCol>
                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>Amount</h5>
                      <p>${invItem !== null && invItem.amount}</p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={3} md={4}>
                    <div className="view_item_box">
                      <h5>Status</h5>
                      <p
                        style={{
                          color:
                            invItem !== null &&
                            invItem.status === "Verified" &&
                            "green",
                        }}
                      >
                        {invItem !== null && invItem.status}
                      </p>
                    </div>
                  </MDBCol>

                  <MDBCol lg={12}>
                    <div className="view_item_box">
                      <h5>Description</h5>
                      <p>{invItem !== null && invItem.description}</p>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setViewModal(!viewModal)}
              >
                Cancel
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ViewModal;
