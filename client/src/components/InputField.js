import React from "react";
import {
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBInputGroupElement,
  MDBInputGroupText,
} from "mdb-react-ui-kit";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Select from "react-select";

export const InputField = (props) => {
  const {
    id,
    type,
    label,
    value,
    changeValue,
    checkValidEmail,
    seePassword,
    setSeePassword,
    checkValidPassword,
    errPassword,
    iconSeePasword,
    disable,
  } = props;
  return (
    <div className="form_group">
      <MDBInput
        type={type}
        id={id}
        label={label}
        onChange={changeValue}
        value={value}
        disabled={disable}
        autoFocus={false}
      />
      {checkValidEmail && checkValidEmail === true ? (
        <span className="txt-error">Please enter your valid email</span>
      ) : (
        ""
      )}

      {iconSeePasword ? (
        <span className="showHide" onClick={() => setSeePassword(!seePassword)}>
          {seePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
        </span>
      ) : null}
      {checkValidPassword ? (
        <span className="txt-error">{errPassword}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export const SelectField = (props) => {
  let { value, changeValue, roleOptions, placeholder, clsName } = props;
  return (
    <>
      <div className={clsName ? "form_group modal_group" : "form_group"}>
        <Select
          value={value}
          onChange={changeValue}
          options={roleOptions}
          placeholder={placeholder}
          autoFocus={false}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "rgb(237 73 44 / 20%)",
              primary: " #ed492c",
            },
          })}
        />
      </div>
    </>
  );
};

export const ModalInput = (props) => {
  let {
    type,
    label,
    value,
    changeValue,
    col,
    text,
    name,
    textarea,
    disable,
    validate,
    reff,
    focus,
  } = props;
  return (
    <>
      <MDBCol lg={col}>
        <label htmlFor={name}>{label}</label>
        <div className="input-group">
          {text === true && <div className="input-group-text">$</div>}
          {textarea === true ? (
            <textarea
              onChange={changeValue}
              value={value}
              id={label}
              name={name}
              className="form-control"
              cols="30"
              rows="10"
              maxLength={250}
              disabled={disable === true && true}
              ref={reff}
            ></textarea>
          ) : validate === true ? (
            <input
              type={type}
              id={name}
              value={value}
              className="form-control"
              accept=".pdf , .png, .jpg"
              onChange={changeValue}
              ref={reff}
            />
          ) : (
            // <label onChange={changeValue} htmlFor={id} className={id}>
            //   {label}
            //   <p className="form-control">
            //     <span>Choose File</span>
            //     {fileName}
            //   </p>
            // </label>
            <input
              className="form-control"
              type={type}
              onChange={changeValue}
              value={value}
              id={name}
              name={name}
              disabled={disable === true && true}
            />
          )}
        </div>
      </MDBCol>
    </>
  );
};
