import React, { useState, useEffect } from "react";
import {
  MDBBtn,
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
import { toast } from "react-toastify";
import { ModalInput, SelectField } from "../../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { DateMonthYearPicker } from "../../../components/datepicker/DateMonthYearPicker";
import io from "socket.io-client";
import { BASE_URL } from "../../../components/config/BASE_URL";
import { CreateMarketing } from "../../../store/actions/all-actions/MarketingAction";
var socket = io(BASE_URL, { transports: ["websocket"] });

const CreateModal = (props) => {
  // Get modal and dispatch & auth user
  let dispatch = useDispatch();
  let { createModal, setCreateModal } = props;
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Marketing Create States
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({
    amount: 0,
    description: "",
  });

  let { amount, description } = data;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setData({
      amount: 0,
      description: "",
    });
    setStartDate(new Date());
  };
  const closeModal = () => {
    setCreateModal(!createModal);
    clearForm();
  };

  // Marketing create function
  const createMarketingHandler = () => {
    let data = {
      amount: amount,
      description: description,
      name: authUser && authUser.name,
      email: authUser && authUser.email,
      timeStamp: new Date().toLocaleString(),
      date: startDate.toLocaleDateString(),
      code: "MRKT",
    };
    if (data.amount !== 0 && data.description !== "" && data.date !== "") {
      dispatch(CreateMarketing(data, closeModal));
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
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <MDBRow>
                  <MDBCol lg={6}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
                      handleChange={(e) => setStartDate(e)}
                      startDate={startDate}
                    />
                  </MDBCol>

                  <ModalInput
                    type="number"
                    label="Amount"
                    name="amount"
                    value={amount}
                    changeValue={handleChange}
                    col={6}
                    text={true}
                  />
                  <ModalInput
                    label="Description"
                    name="description"
                    value={description}
                    changeValue={handleChange}
                    col={12}
                    textarea={true}
                  />
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>

              <MDBBtn onClick={createMarketingHandler}>Create</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
