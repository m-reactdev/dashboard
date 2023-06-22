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
import { useDispatch, useSelector } from "react-redux";
import { ModalInput, SelectField } from "../../../components/InputField";
import { MonthYearPicker } from "../../../components/datepicker/DateMonthYearPicker";
import { saleUnitOption } from "../../../components/config/SelectFieldOptions";
import { toast } from "react-toastify";
import { updatedSalesTarget } from "../../../store/actions/all-actions/SalesTargetAction";

const EditModal = (props) => {
  // Get modal and dispatch & Auth User
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let salesTarget = useSelector(({ SalesTargetState }) => {
    return SalesTargetState.salesTargetData;
  });
  let {
    invItem,
    updateDate,
    setUpdateDate,
    salesTargetUpdate,
    setSalesTargetUpdate,
    editModal,
    setEditModal,
  } = props;

  let { description, target, limit } = salesTargetUpdate;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesTargetUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setSalesTargetUpdate({
      target: 0,
      limit: 0,
      description: "",
    });
    setUpdateDate(new Date());
  };
  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  // Sales Target update function
  const updateSalesTargetHandler = () => {
    let updateData = {
      _id: invItem?._id,
      target: target,
      limit: limit,
      description: description,
      email: invItem?.email,
      name: invItem?.name,
      timeStamp: new Date().toLocaleString(),
      date: updateDate.toLocaleDateString(),
    };

    if (
      updateData.target !== 0 &&
      updateData.limit !== 0 &&
      updateData.description !== "" &&
      updateData.date !== ""
    ) {
      dispatch(updatedSalesTarget(updateData, closeModal));
      // for (let i = 0; i < salesTarget.length; i++) {
      //   if (
      //     new Date(salesTarget[i].date).getMonth() ===
      //     new Date(updateData.date).getMonth()
      //   ) {
      //     if (
      //       salesTarget[i].unit === updateData.unit &&
      //       salesTarget[i]._id === updateData._id
      //     ) {
      //       dispatch(updatedSalesTarget(updateData, closeModal));
      //       break;
      //     } else if (
      //       salesTarget[i].unit !== updateData.unit &&
      //       salesTarget[i]._id === updateData._id
      //     ) {
      //       dispatch(updatedSalesTarget(updateData, closeModal));
      //       break;
      //     } else if (
      //       salesTarget[i].unit === updateData.unit &&
      //       salesTarget[i]._id !== updateData._id
      //     ) {
      //       toast.warn("This sales target has already exist...!", {
      //         position: "top-right",
      //         autoClose: 2000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "light",
      //       });
      //       break;
      //     }
      //   }

      //   if (
      //     new Date(salesTarget[i].date).getMonth() !==
      //     new Date(updateData.date).getMonth()
      //   ) {
      //     dispatch(updatedSalesTarget(updateData, closeModal));
      //     break;
      //   }
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
      <MDBModal tabIndex="-1" show={editModal} setShow={setEditModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update Data</MDBModalTitle>
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
                      handleChange={(e) => setUpdateDate(e)}
                      startDate={updateDate}
                    />
                  </MDBCol>
                  <MDBCol lg={4}>
                    <label htmlFor="">Unit</label>
                    <SelectField
                      clsName={true}
                      value={unitUpdate}
                      changeValue={(e) => setUnitUpdate(e)}
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
                      handleChange={(e) => setUpdateDate(e)}
                      startDate={updateDate}
                    />
                  </MDBCol>
                  <ModalInput
                    type="number"
                    label="Sales Target"
                    name="target"
                    value={target}
                    changeValue={handleChange}
                    col={4}
                    text={true}
                  />
                  <ModalInput
                    type="number"
                    label="Spending Limit"
                    name="limit"
                    value={limit}
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
              <MDBBtn onClick={updateSalesTargetHandler}>Update</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
