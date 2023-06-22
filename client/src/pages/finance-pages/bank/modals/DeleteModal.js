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
import { useDispatch } from "react-redux";
import { deleteBank } from "../../../../store/actions/all-actions/finance-actions/BankAction";

import io from "socket.io-client";
import { BASE_URL } from "../../../../components/config/BASE_URL";
var socket = io(BASE_URL, { transports: ["websocket"] });

const DeleteModal = (props) => {
  // Get modal and dispatch & Auth User
  let dispatch = useDispatch();
  let { deleteModal, setDeleteModal, invItem } = props;

  // Delete function
  const deleteHandler = (item) => {
    dispatch(deleteBank(item, deleteModal, setDeleteModal, socket));
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={deleteModal} setShow={setDeleteModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete</MDBModalTitle>
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
              <MDBBtn onClick={() => deleteHandler(invItem)}>Delete</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DeleteModal;
