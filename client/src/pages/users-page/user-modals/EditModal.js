import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCheckbox,
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
import { InputField } from "../../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { checkPasswordValidity } from "../../../components/config/EmailPasswordValidation";
import { updateUser } from "../../../store/actions/all-actions/AuthAction";
import { toast } from "react-toastify";

const EditModal = (props) => {
  // Get modal and dispatch and auth user
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let dispatch = useDispatch();
  let {
    _id,
    updateName,
    setUpdateName,
    updateEmail,
    updateRole,
    setUpdateRole,
    updatePassword,
    setUpdatePassword,
    updateUserRights,
    editModal,
    setEditModal,
  } = props;

  // User Update States
  const [errPassword, setErrPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  // Clear form and close modal functions
  let clearForm = () => {
    setUpdateName("");
    setUpdateRole("");
    setUpdatePassword("");
  };
  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  // User Update function
  const updateUserHandler = async () => {
    let updateData = {
      _id: _id,
      name: updateName,
      email: updateEmail,
      password: updatePassword,
      role: updateRole,
      status: "Updated",
      userRights: updateUserRights,
    };
    if (
      updateData.name !== "" &&
      updateData.email !== "" &&
      updateData.status !== "" &&
      updateData.role !== "" &&
      !checkValidPassword
    ) {
      if (updateData.email === authUser?.email) {
        updateData.status = "Active";
        dispatch(updateUser(updateData, closeModal, authUser));
      } else {
        dispatch(updateUser(updateData, closeModal, authUser));
      }
    } else {
      toast.error("Please fill all required fields", {
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

  return (
    <>
      <MDBModal tabIndex="-1" show={editModal} setShow={setEditModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <InputField
                  id="form3Example5"
                  type="text"
                  label="Full name"
                  value={updateName}
                  changeValue={(e) => setUpdateName(e.target.value)}
                />
                <InputField
                  id="form3Example6"
                  type="text"
                  label="Role"
                  value={updateRole}
                  changeValue={(e) => setUpdateRole(e.target.value)}
                />
                <InputField
                  id="form3Example7"
                  type="email"
                  label="Email address"
                  value={updateEmail}
                  disable={true}
                />
                <InputField
                  id="form3Example8"
                  type={seePassword ? "text" : "password"}
                  label="Password"
                  value={updatePassword}
                  changeValue={(e) =>
                    checkPasswordValidity(
                      e.target.value,
                      setUpdatePassword,
                      setCheckValidPassword,
                      setErrPassword
                    )
                  }
                  checkValidPassword={checkValidPassword}
                  setSeePassword={setSeePassword}
                  seePassword={seePassword}
                  errPassword={errPassword}
                  iconSeePasword={true}
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={updateUserHandler}>Update User</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
