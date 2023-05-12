import React, { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { InputField, SelectField } from "../components/InputField";
import {
  checkPasswordValidity,
  handleCheckEmail,
} from "../components/config/Config";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../store/actions/all-actions/AuthAction";
import { roleOption } from "../components/select-options/Options";

function Register() {
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
      dispatch(registerUser(userData, clearForm));
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
      <div className="form_bg">
        <Link to={"/"}>
          <img
            src="https://www.techigator.com/images/tg-icon.webp"
            alt="Logo"
            className="logo"
          />
        </Link>
        <div className="formBlock">
          <h3>Register</h3>
          <div className="formGrid">
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
                handleCheckEmail(e.target.value, setEmail, setCheckValidEmail)
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
          <MDBBtn
            color="primary"
            className="submitBtn"
            type="submit"
            onClick={signupHandler}
          >
            Register
          </MDBBtn>

          <p className="accLink">
            Already have an account? <Link to={"/"}>Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
