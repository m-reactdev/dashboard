import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const RejectModal = (props) => {
  // Get modal
  let { rejectModal, setRejectModal, invItem } = props;

  return (
    <>
      <MDBModal tabIndex="-1" show={rejectModal} setShow={setRejectModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Rejection Reason</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setRejectModal(!rejectModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>{invItem !== null && invItem.rejectedDescription}</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setRejectModal(!rejectModal)}
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

export default RejectModal;
