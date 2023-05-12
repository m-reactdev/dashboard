import React, { useState } from "react";
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
import { InputField, SelectField } from "../../InputField";
import { useDispatch, useSelector } from "react-redux";
import { checkPasswordValidity, handleCheckEmail } from "../../config/Config";
import {
  fetchUsers,
  updateUser,
} from "../../../store/actions/all-actions/AuthAction";
import { toast } from "react-toastify";
import { roleOption } from "../../select-options/Options";

const EditModal = (props) => {
  let {
    _id,
    updateName,
    setUpdateName,
    updateEmail,
    updateRole,
    setUpdateRole,
    updatePassword,
    setUpdatePassword,
    editModal,
    setEditModal,
  } = props;
  let dispatch = useDispatch();
  const [errPassword, setErrPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  const updateUserHandler = () => {
    let userUpdate = {
      _id: _id,
      name: updateName,
      email: updateEmail,
      role: updateRole,
      password: updatePassword,
    };

    if (
      userUpdate.name !== "" &&
      userUpdate.role !== "" &&
      !checkValidPassword
    ) {
      dispatch(updateUser(userUpdate, editModal, setEditModal));
      dispatch(fetchUsers());
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
              <MDBModalTitle>Edit Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setEditModal(!editModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <InputField
                  id="form3Example7"
                  type="email"
                  label="Email address"
                  value={updateEmail}
                  disable={true}
                />
                <InputField
                  id="form3Example5"
                  type="text"
                  label="Full name"
                  value={updateName}
                  changeValue={(e) => setUpdateName(e.target.value)}
                />
                <SelectField
                  value={{ label: updateRole }}
                  changeValue={(e) => setUpdateRole(e.value)}
                  roleOptions={roleOption}
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
              <MDBBtn
                color="secondary"
                onClick={() => setEditModal(!editModal)}
              >
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
