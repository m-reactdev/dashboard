import React, { useState, useRef } from "react";
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
import { DateMonthYearPicker } from "../../../../components/datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createBank } from "../../../../store/actions/all-actions/finance-actions/BankAction";
import { transactionOptions } from "../../../../components/config/SelectFieldOptions";

import io from "socket.io-client";
import { BASE_URL } from "../../../../components/config/BASE_URL";
var socket = io(BASE_URL, { transports: ["websocket"] });

const CreateModal = (props) => {
  // Get modal and dispatch
  const ref = useRef();
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let { createModal, setCreateModal } = props;

  // Create States
  const [startDate, setStartDate] = useState(new Date());
  const [refId, setRefId] = useState("");
  const [type, setType] = useState(null);
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("");

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
      setPdfFile(newUrl);
      setFileName(selectedFile.name);
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
      setFileName("");
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
      setFileName("");
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
    setAmount("");
    setRefId("");
    setType(null);
    setDescription("");
    setStartDate(new Date());
    if (type && type.value !== "Cash") {
      ref.current.value = "";
      setFileName("");
    }
  };
  const closeModal = () => {
    setCreateModal(!createModal);
    clearForm();
  };

  // Create function
  const createHandler = () => {
    let data = {
      date: startDate.toLocaleDateString(),
      amount: Number(amount),
      refId: type && type.value === "Cash" ? "" : refId,
      pdfFile: type && type.value === "Cash" ? null : pdfFile,
      fileName: type && type.value === "Cash" ? "" : fileName,
      type: type && type?.value,
      description: description,
      email: authUser && authUser.email,
      name: authUser && authUser.name,
      timeStamp: new Date().toLocaleString(),
      code: "BANK",
    };

    if (data.type === "Cash") {
      if (data.amount !== 0 && data.description !== "" && data.date !== "") {
        dispatch(createBank(data, closeModal, socket));
      }
    } else {
      if (
        data.amount !== 0 &&
        data.description !== "" &&
        data.date !== "" &&
        data.pdfFile !== "" &&
        data.refId !== ""
      ) {
        dispatch(createBank(data, closeModal));
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
                  <MDBCol lg={3}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
                      handleChange={(e) => setStartDate(e)}
                      startDate={startDate}
                    />
                  </MDBCol>
                  <MDBCol lg={3}>
                    <label htmlFor="">Transaction Type</label>
                    <SelectField
                      clsName={true}
                      value={type}
                      changeValue={(e) => setType(e)}
                      roleOptions={transactionOptions}
                      placeholder={"Select Type"}
                    />
                  </MDBCol>

                  {type !== null && type?.value === "Cash" ? null : (
                    <ModalInput
                      type="text"
                      label="Bank Reference"
                      name="refId"
                      value={refId}
                      changeValue={(e) => setRefId(e.target.value)}
                      col={3}
                    />
                  )}

                  <ModalInput
                    type="number"
                    label="Amount"
                    name="amount"
                    value={amount}
                    changeValue={(e) => setAmount(e.target.value)}
                    col={3}
                  />

                  {type !== null && type?.value === "Cash" ? null : (
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
                    name="description"
                    value={description}
                    changeValue={(e) => setDescription(e.target.value)}
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
              <MDBBtn onClick={createHandler}>Create Data</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
