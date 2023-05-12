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
import {
  deleteUser,
  fetchUsers,
} from "../../../store/actions/all-actions/AuthAction";

const DeleteModal = (props) => {
  let dispatch = useDispatch();
  let { deleteModal, setDeleteModal, _id } = props;

  const deleteUserHandler = () => {
    dispatch(deleteUser(_id, deleteModal, setDeleteModal));
    dispatch(fetchUsers());
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
              <MDBBtn onClick={deleteUserHandler}>Delete user</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DeleteModal;
