import React, { useRef, useState } from "react";
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
import { CreateCompliance } from "../../../store/actions/all-actions/ComplianceAction";
import { complianceOption } from "../../../components/config/SelectFieldOptions";

const CreateModal = (props) => {
  // Get modal and dispatch & auth user
  let dispatch = useDispatch();
  let { createModal, setCreateModal } = props;
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Compliance Create States
  const [startDate, setStartDate] = useState(new Date());
  const [type, setType] = useState(null);
  const [complianceData, setComplianceData] = useState({
    amount: 0,
    description: "",
  });

  let { amount, description } = complianceData;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplianceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setComplianceData({
      amount: 0,
      description: "",
    });
    setStartDate(new Date());
    setType(null);
  };
  const closeModal = () => {
    setCreateModal(!createModal);
    clearForm();
  };

  // Compliance create function
  const createComplianceHandler = () => {
    let data = {
      // compliance: {
      //   chargeback: type?.value === "Chargeback" ? amount : 0,
      //   refund: type?.value === "Refund" ? amount : 0,
      //   casewin: type?.value === "CaseWin" ? amount : 0,
      //   caseloss: type?.value === "CaseLoss" ? amount : 0,
      // },
      amount: amount,
      description: description,
      name: authUser && authUser.name,
      email: authUser && authUser.email,
      type: type ? type.value : null,
      timeStamp: new Date().toLocaleString(),
      date: startDate.toLocaleDateString(),
      code: "CMPL",
    };

    if (
      data.amount !== 0 &&
      data.description !== "" &&
      data.date !== "" &&
      data.type !== ""
    ) {
      dispatch(CreateCompliance(data, closeModal));
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
                  <MDBCol lg={4}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
                      handleChange={(e) => setStartDate(e)}
                      startDate={startDate}
                    />
                  </MDBCol>
                  <MDBCol lg={4}>
                    <label htmlFor="">Type</label>
                    <SelectField
                      clsName={true}
                      value={type}
                      changeValue={(e) => setType(e)}
                      roleOptions={complianceOption}
                      placeholder={"Select Type"}
                    />
                  </MDBCol>
                  <ModalInput
                    type="number"
                    label="Amount"
                    name="amount"
                    value={amount}
                    changeValue={handleChange}
                    col={4}
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
              <MDBBtn onClick={createComplianceHandler}>Create</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
