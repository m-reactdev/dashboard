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
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_URL } from "../../../components/config/BASE_URL";
import { deleteMarketing } from "../../../store/actions/all-actions/MarketingAction";
var socket = io(BASE_URL, {
  transports: ["websocket"],
});

const DeleteModal = (props) => {
  // Get modal and dispatch & Auth User
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let { deleteModal, setDeleteModal, invItem } = props;

  // Vendor delete function
  const deleteSaleItem = (item) => {
    if (
      authUser.userRights.indexOf("Marketing") > -1 ||
      authUser.userRights.indexOf("Super Admin") > -1 ||
      authUser.userRights.indexOf("Developer") > -1
    ) {
      dispatch(deleteMarketing(item._id, deleteModal, setDeleteModal));
    }
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={deleteModal} setShow={setDeleteModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setDeleteModal(!deleteModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Are you sure? you want to delete this entry.</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setDeleteModal(!deleteModal)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn onClick={() => deleteSaleItem(invItem)}>Delete</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DeleteModal;
