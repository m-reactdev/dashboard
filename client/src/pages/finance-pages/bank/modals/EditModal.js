import React, { useEffect, useRef } from "react";
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
import { ModalInput, SelectField } from "../../../../components/InputField";
import { transactionOptions } from "../../../../components/config/SelectFieldOptions";
import { DateMonthYearPicker } from "../../../../components/datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateBank } from "../../../../store/actions/all-actions/finance-actions/BankAction";

import io from "socket.io-client";
import { BASE_URL } from "../../../../components/config/BASE_URL";
var socket = io(BASE_URL, { transports: ["websocket"] });

const EditModal = (props) => {
  // Get modal and dispatch & Auth User
  const ref = useRef();
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let {
    updateDate,
    setUpdateDate,
    updateRefId,
    setUpdateRefId,
    updatePdfFile,
    setUpdatePdfFile,
    updatedFileName,
    setupdatedFileName,
    updateType,
    setUpdateType,
    updateAmount,
    setUpdateAmount,
    updateDescription,
    setUpdateDescription,
    invItem,
    editModal,
    setEditModal,
  } = props;

  // Handle PDF Change Function
  const handlePdfChange = async (e) => {
    let selectedFile = e.target.files[0];
    const MIN_FILE_SIZE = 120; // 0.12 MB
    const MAX_FILE_SIZE = 2000; // 5MB
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
    setUpdateAmount("");
    setUpdateDescription("");
    setUpdateDate(new Date());
    setUpdateRefId("");
    setUpdateType(null);
    if (updateType && updateType.value !== "Cash") {
      setupdatedFileName("");
      ref.current.value = "";
    }
  };
  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  // Update function
  const updateHandler = () => {
    let updateData = {
      _id: invItem && invItem._id,
      amount: Number(updateAmount),
      description: updateDescription,
      type: updateType && updateType.value,
      refId: updateType && updateType.value === "Cash" ? "" : updateRefId,
      pdfFile: updateType && updateType.value === "Cash" ? null : updatePdfFile,
      fileName:
        updateType && updateType.value === "Cash" ? "" : updatedFileName,
      email: authUser && authUser.email,
      name: authUser && authUser.name,
      timeStamp: new Date().toLocaleString(),
      date: updateDate.toLocaleDateString(),
      code: "BANK",
    };

    if (updateData.type === "Cash") {
      if (
        updateData.amount !== 0 &&
        updateData.description !== "" &&
        updateData.date !== ""
      ) {
        dispatch(updateBank(updateData, closeModal, socket));
      }
    } else {
      if (
        updateData.amount !== 0 &&
        updateData.description !== "" &&
        updateData.date !== "" &&
        updateData.pdfFile !== "" &&
        updateData.refId !== ""
      ) {
        dispatch(updateBank(updateData, closeModal, socket));
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
                  <MDBCol lg={3}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
                      handleChange={(e) => setUpdateDate(e)}
                      startDate={updateDate}
                    />
                  </MDBCol>

                  <MDBCol lg={3}>
                    <label htmlFor="">Transaction Type</label>
                    <SelectField
                      clsName={true}
                      value={updateType}
                      changeValue={(e) => setUpdateType(e)}
                      roleOptions={transactionOptions}
                      placeholder={"Select Type"}
                    />
                  </MDBCol>

                  {updateType !== null &&
                  updateType?.value === "Cash" ? null : (
                    <ModalInput
                      type="text"
                      label="Bank Reference"
                      name="updateRefId"
                      value={updateRefId}
                      changeValue={(e) => setUpdateRefId(e.target.value)}
                      col={3}
                    />
                  )}

                  <ModalInput
                    type="number"
                    label="Amount"
                    name="updateAmount"
                    value={updateAmount}
                    changeValue={(e) => setUpdateAmount(e.target.value)}
                    col={3}
                  />

                  {updateType !== null &&
                  updateType?.value === "Cash" ? null : (
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
                  )}

                  <ModalInput
                    label="Description"
                    name="updateDescription"
                    value={updateDescription}
                    changeValue={(e) => setUpdateDescription(e.target.value)}
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
              <MDBBtn onClick={updateHandler}>Update Data</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
