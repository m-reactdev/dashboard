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
import { ModalInput, SelectField } from "../../../components/InputField";
import { DateMonthYearPicker } from "../../../components/datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { unitOption } from "../../../components/config/SelectFieldOptions";
import { vendorUpdated } from "../../../store/actions/all-actions/VendorAction";
import { toast } from "react-toastify";

const EditModal = (props) => {
  // Get modal and dispatch & Auth User
  const ref = useRef();
  let dispatch = useDispatch();

  let {
    updatedFileName,
    setupdatedFileName,
    updatePdfFile,
    setUpdatePdfFile,
    invItem,
    updateDate,
    setUpdateDate,
    unitUpdate,
    setUnitUpdate,
    vendorUpdate,
    setVendorUpdate,
    editModal,
    setEditModal,
  } = props;

  let { description, amount } = vendorUpdate;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle PDF Change Function
  const handlePdfChange = async (e) => {
    let selectedFile = e.target.files[0];
    const MIN_FILE_SIZE = 12; // 0.12 MB
    const MAX_FILE_SIZE = 5120; // 5MB
    const fileSizeKiloBytes = selectedFile.size / 1024;

    if (
      fileSizeKiloBytes > MIN_FILE_SIZE &&
      fileSizeKiloBytes < MAX_FILE_SIZE
    ) {
      let newUrl = await toBase64(selectedFile);
      setUpdatePdfFile(newUrl);
      setupdatedFileName(selectedFile.name);
    } else if (fileSizeKiloBytes < MIN_FILE_SIZE) {
      toast.info("File size is less than minimum limit", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      ref.current.value = "";
      setupdatedFileName("");
    } else if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      toast.info("File size is greater than maximum limit", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      ref.current.value = "";
      setupdatedFileName("");
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Clear form and close modal functions
  const clearForm = () => {
    setVendorUpdate({
      amount: 0,
      description: "",
    });
    setUpdateDate(new Date());
    setUnitUpdate(null);
    setupdatedFileName("");
    ref.current.value = "";
  };
  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  // Vendor update function
  const updateVendorHandler = () => {
    let updateData = {
      _id: invItem?._id,
      amount: amount,
      description: description,
      email: invItem?.email,
      name: invItem?.name,
      timeStamp: new Date().toLocaleString(),
      date: updateDate.toLocaleDateString(),
      code: invItem?.code,
      unit: unitUpdate && unitUpdate.value,
      pdfFile: updatePdfFile,
      updatedFileName: updatedFileName,
    };

    if (
      updateData.amount !== 0 &&
      updateData.description !== "" &&
      updateData.date !== "" &&
      updateData.unit !== "" &&
      updateData.pdfFile !== ""
    ) {
      dispatch(vendorUpdated(updateData, closeModal));
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
                <MDBRow>
                  <MDBCol lg={4}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
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
                      roleOptions={unitOption}
                      placeholder={"Select Unit"}
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
                    type="file"
                    label="File Uploader"
                    changeValue={handlePdfChange}
                    col={12}
                    name="fileUploader"
                    validate={true}
                    id="formId"
                    reff={ref}
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
              <MDBBtn onClick={updateVendorHandler}>Update</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
