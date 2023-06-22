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
import { unitOption } from "../../../components/config/SelectFieldOptions";
import { CreateVendor } from "../../../store/actions/all-actions/VendorAction";
import io from "socket.io-client";
import { BASE_URL } from "../../../components/config/BASE_URL";
var socket = io(BASE_URL, { transports: ["websocket"] });

const CreateModal = (props) => {
  // Get modal and dispatch & auth user
  const ref = useRef();
  let dispatch = useDispatch();
  let { createModal, setCreateModal } = props;
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Vendor Create States
  const [startDate, setStartDate] = useState(new Date());
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [unit, setUnit] = useState(null);
  const [vendorData, setVendorData] = useState({
    amount: 0,
    description: "",
  });

  let { amount, description } = vendorData;

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevState) => ({
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
    setVendorData({
      amount: 0,
      description: "",
    });
    setStartDate(new Date());
    setUnit(null);
    setFileName("");
    ref.current.value = "";
  };
  const closeModal = () => {
    setCreateModal(!createModal);
    clearForm();
  };

  // Vendor create function
  const createVendorHandler = () => {
    let data = {
      amount: amount,
      description: description,
      name: authUser && authUser.name,
      email: authUser && authUser.email,
      unit: unit ? unit.value : null,
      timeStamp: new Date().toLocaleString(),
      date: startDate.toLocaleDateString(),
      code: "VNDR",
      pdfFile: pdfFile,
      fileName: fileName,
    };
    if (
      data.amount !== 0 &&
      data.description !== "" &&
      data.date !== "" &&
      data.unit !== "" &&
      data.pdfFile !== ""
    ) {
      dispatch(CreateVendor(data, closeModal));
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
                    <label htmlFor="">Unit</label>
                    <SelectField
                      clsName={true}
                      value={unit}
                      changeValue={(e) => setUnit(e)}
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
              <MDBBtn onClick={createVendorHandler}>Create</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateModal;
