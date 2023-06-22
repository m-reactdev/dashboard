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
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ModalInput, SelectField } from "../../../components/InputField";
import { MonthYearPicker } from "../../../components/datepicker/DateMonthYearPicker";
import { saleUnitOption } from "../../../components/config/SelectFieldOptions";
import { CreateSalesTarget } from "../../../store/actions/all-actions/SalesTargetAction";
import io from "socket.io-client";
import { BASE_URL } from "../../../components/config/BASE_URL";
var socket = io(BASE_URL, { transports: ["websocket"] });

const CreateModal = (props) => {
  // Get modal and dispatch & auth user
  let dispatch = useDispatch();
  let { createModal, setCreateModal } = props;
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let salesTargetDate = useSelector(({ SalesTargetState }) => {
    return SalesTargetState.salesTargetData;
  });

  // Target Create States
  const [startDate, setStartDate] = useState(new Date());
  const [unit, setUnit] = useState(null);
  const [targetData, setTargetData] = useState({
    salesTarget: 0,
    spendingLimit: 0,
    description: "",
  });

  let { salesTarget, spendingLimit, description } = targetData;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTargetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setTargetData({
      salesTarget: 0,
      spendingLimit: 0,
      description: "",
    });
    setStartDate(new Date());
    // setUnit(null);
  };
  const closeModal = () => {
    setCreateModal(!createModal);
    clearForm();
  };

  // target create function
  const createTargetSalesHandler = () => {
    let data = {
      target: salesTarget,
      limit: spendingLimit,
      description: description,
      name: authUser && authUser.name,
      email: authUser && authUser.email,
      unit: unit ? unit.value : null,
      timeStamp: new Date().toLocaleString(),
      date: startDate.toLocaleDateString(),
      code: "TAR",
    };
    if (
      data.target !== 0 &&
      data.limit !== 0 &&
      data.description !== "" &&
      data.date !== "" &&
      data.unit !== ""
    ) {
      dispatch(CreateSalesTarget(data, closeModal));
      // let duplicate = false;
      // for (let i = 0; i < salesTargetDate.length; i++) {
      //   if (
      //     new Date(salesTargetDate[i].date).getMonth() ===
      //     new Date(data.date).getMonth()
      //   ) {
      //     if (salesTargetDate[i].unit === data.unit) {
      //       duplicate = true;
      //       break;
      //     }
      //   }
      // }
      // if (duplicate) {
      //   toast.warn("This sales target has already exist...!", {
      //     position: "top-right",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      // } else {
      //   dispatch(CreateSalesTarget(data, closeModal));
      // }
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
                {/* <MDBRow>
                  <MDBCol lg={4}>
                    <label htmlFor="">Date</label>
                    <MonthYearPicker
                      clsname={true}
                      handleChange={(e) => setStartDate(e)}
                      startDate={startDate}
                    />
                  </MDBCol>
                  <MDBCol lg={4}>
                    <label htmlFor="">Unit</label>
                    <SelectField
                      clsName={true}
                      value={unit}
                      changeValue={(e) => setUnit(e)}
                      roleOptions={saleUnitOption}
                      placeholder={"Select Unit"}
                    />
                  </MDBCol>
                </MDBRow> */}
                <MDBRow>
                  <MDBCol lg={4}>
                    <label htmlFor="">Date</label>
                    <MonthYearPicker
                      clsname={true}
                      handleChange={(e) => setStartDate(e)}
                      startDate={startDate}
                    />
                  </MDBCol>
                  <ModalInput
                    type="number"
                    label="Sales Target"
                    name="salesTarget"
                    value={salesTarget}
                    changeValue={handleChange}
                    col={4}
                    text={true}
                  />
                  <ModalInput
                    type="number"
                    label="Spending Limit"
                    name="spendingLimit"
                    value={spendingLimit}
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
              <MDBBtn onClick={createTargetSalesHandler}>Create</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
