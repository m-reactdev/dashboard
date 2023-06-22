import React, { useState } from "react";
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
import { InputField, SelectField } from "../../../components/InputField";
import { useDispatch } from "react-redux";
import {
  checkPasswordValidity,
  handleCheckEmail,
} from "../../../components/config/EmailPasswordValidation";
import { registerUser } from "../../../store/actions/all-actions/AuthAction";
import { toast } from "react-toastify";
import { roleOption } from "../../../components/config/SelectFieldOptions";
import { Link } from "react-router-dom";

const CreateModal = (props) => {
  // Get modal and dispatch
  let dispatch = useDispatch();
  let { createModal, setCreateModal } = props;

  // User Create States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [userRights, setUserRights] = useState([]);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [errPassword, setErrPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  // Clear form and close modal functions
  let clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };
  const closeModal = () => {
    setCreateModal(!createModal);
    clearForm();
  };

  // User create function
  const createUserHandler = async () => {
    let data = {
      name: name,
      email: email,
      password: password,
      role: role,
      userRights: userRights,
      status: "Pending",
    };
    if (
      data.name !== "" &&
      data.role !== "" &&
      data.status !== "" &&
      !checkValidEmail &&
      !checkValidPassword
    ) {
      dispatch(registerUser(data, closeModal));
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
      <MDBModal tabIndex="-1" show={createModal} setShow={setCreateModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <InputField
                  id="form3Example1"
                  type="text"
                  label="Full name"
                  value={name}
                  changeValue={(e) => setName(e.target.value)}
                />
                {/* <SelectField
                  value={role}
                  changeValue={(e) => setRole(e)}
                  roleOptions={roleOption}
                  placeholder={"Select role"}
                /> */}
                <InputField
                  id="form3Example2"
                  type="text"
                  label="Role"
                  value={role}
                  changeValue={(e) => setRole(e.target.value)}
                />
                <InputField
                  id="form3Example3"
                  type="email"
                  label="Email address"
                  value={email}
                  changeValue={(e) =>
                    handleCheckEmail(
                      e.target.value,
                      setEmail,
                      setCheckValidEmail
                    )
                  }
                  checkValidEmail={checkValidEmail}
                />
                <InputField
                  id="form3Example4"
                  type={seePassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  changeValue={(e) =>
                    checkPasswordValidity(
                      e.target.value,
                      setPassword,
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
              <MDBBtn onClick={createUserHandler}>Create User</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
