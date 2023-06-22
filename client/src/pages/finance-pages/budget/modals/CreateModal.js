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
import { ModalInput } from "../../../../components/InputField";
import { DateMonthYearPicker } from "../../../../components/datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createBudget } from "../../../../store/actions/all-actions/finance-actions/BudgetAction";

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
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");

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
    setDescription("");
    setStartDate(new Date());
    ref.current.value = "";
    setFileName("");
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
      pdfFile: pdfFile,
      fileName: fileName,
      description: description,
      rejectedDescription: "",
      email: authUser && authUser.email,
      name: authUser && authUser.name,
      status: "Pending",
      timeStamp: new Date().toLocaleString(),
      code: "BDGT",
      seen: false,
    };

    if (
      data.amount !== 0 &&
      data.description !== "" &&
      data.date !== "" &&
      data.pdfFile !== ""
    ) {
      dispatch(createBudget(data, closeModal, authUser, socket));
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
                    changeValue={(e) => setAmount(e.target.value)}
                    col={6}
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
              <MDBBtn onClick={createHandler}>Request for Approval</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
