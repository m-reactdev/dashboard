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
  MDBCol,
} from "mdb-react-ui-kit";
import { InputField, SelectField } from "../../InputField";
import { useDispatch } from "react-redux";
import { checkPasswordValidity, handleCheckEmail } from "../../config/Config";
import {
  fetchUsers,
  registerUser,
} from "../../../store/actions/all-actions/AuthAction";
import { toast } from "react-toastify";
import { roleOption } from "../../select-options/Options";

const CreateModal = (props) => {
  let { createModal, setCreateModal } = props;
  let dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [errPassword, setErrPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  let clearForm = () => {
    setName("");
    setEmail("");
    setRole(null);
    setPassword("");
  };

  const signupHandler = async () => {
    let userData = {
      name: name,
      email: email,
      password: password,
      role: role ? role.value : null,
    };
    if (
      userData.name !== "" &&
      userData.role !== "" &&
      !checkValidEmail &&
      !checkValidPassword
    ) {
      dispatch(registerUser(userData, clearForm, createModal, setCreateModal));
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
      <MDBModal tabIndex="-1" show={createModal} setShow={setCreateModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setCreateModal(!createModal)}
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
                <SelectField
                  value={role}
                  changeValue={(e) => setRole(e)}
                  roleOptions={roleOption}
                  placeholder={"Select role"}
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
              <MDBBtn
                color="secondary"
                onClick={() => setCreateModal(!createModal)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn onClick={signupHandler}>Create User</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
