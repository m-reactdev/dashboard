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

import {
  fetchInventory,
  inventoryDelete,
} from "../../../store/actions/all-actions/InventoryAction";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import { BASE_URL } from "../../URL/BASE_URL";

var socket = io(BASE_URL, {
  transports: ["websocket"],
});

const DeleteModal = (props) => {
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let { deleteModal, setDeleteModal, invItem } = props;

  const deleteInventoryItem = (item) => {
    if (authUser.role === "Admin" || authUser.role === "Accounts") {
      dispatch(inventoryDelete(item._id, socket, deleteModal, setDeleteModal));
      dispatch(fetchInventory());
    }
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={deleteModal} setShow={setDeleteModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete Inventory</MDBModalTitle>
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
              <MDBBtn onClick={() => deleteInventoryItem(invItem)}>
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
