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
import { deleteSalesTarget } from "../../../store/actions/all-actions/SalesTargetAction";
import io from "socket.io-client";
import { BASE_URL } from "../../../components/config/BASE_URL";
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

  // Sales target delete function
  const deleteSalesTargetItem = (item) => {
    if (
      authUser.userRights.indexOf("Super Admin") > -1 ||
      authUser.userRights.indexOf("Developer") > -1
    ) {
      dispatch(deleteSalesTarget(item._id, deleteModal, setDeleteModal));
    }
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={deleteModal} setShow={setDeleteModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete Target</MDBModalTitle>
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
              <MDBBtn onClick={() => deleteSalesTargetItem(invItem)}>
                Delete
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DeleteModal;
