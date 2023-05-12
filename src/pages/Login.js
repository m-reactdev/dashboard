import React, { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import {
  checkPasswordValidity,
  handleCheckEmail,
} from "../components/config/Config";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/all-actions/AuthAction";
import { toast } from "react-toastify";

function Login() {
  let dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [errPassword, setErrPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  const loginHandler = async () => {
    let userData = {
      email: email,
      password: password,
    };
    if (!checkValidEmail && !checkValidPassword) {
      dispatch(loginUser(userData));
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
            src="http://www.techigator.com/images/tg-icon.webp"
            alt="Logo"
            className="logo"
          />
        </Link>
        <div className="formBlock">
          <h3>Login</h3>
          <div className="formGrid">
            <InputField
              id="form3Example1"
              type="email"
              label="Email address"
              value={email}
              changeValue={(e) =>
                handleCheckEmail(e.target.value, setEmail, setCheckValidEmail)
              }
              checkValidEmail={checkValidEmail}
            />
            <InputField
              id="form3Example2"
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
            onClick={loginHandler}
          >
            Login
          </MDBBtn>

          {/* {authuser && authuser.role === "Admin" && (
            <p className="accLink">
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Login;
