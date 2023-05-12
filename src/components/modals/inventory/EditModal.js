import React, { useRef } from "react";
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
import { ModalInput } from "../../InputField";
import { MonthYearPicker } from "../../datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,
  inventoryUpdate,
} from "../../../store/actions/all-actions/InventoryAction";
import { toast } from "react-toastify";

const EditModal = (props) => {
  const ref = useRef();
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let {
    updateDate,
    setUpdateDate,
    updatePdfFile,
    setUpdatePdfFile,
    inventoryData,
    setInventoryData,
    editModal,
    setEditModal,
    updatedFileName,
    setupdatedFileName,
  } = props;

  let { _id, amount, description, email, name, status } = inventoryData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInventoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const clearForm = () => {
    setInventoryData({
      amount: 0,
      description: "",
    });
    setUpdateDate(new Date());
    setupdatedFileName("");
    ref.current.value = "";
  };

  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  const inventoryDataHandler = () => {
    let updateData = {
      _id: _id,
      amount: amount,
      description: description,
      pdfFile: updatePdfFile,
      updatedFileName: updatedFileName,
      email: email,
      name: name,
      rejectedDescription: "",
      status: "Pending",
      timeStamp: new Date().toLocaleString(),
      monthYear: updateDate.toLocaleDateString(),
    };

    if (authUser.role === "Admin" || authUser.role === "Accounts") {
      if (
        updateData.amount !== 0 &&
        updateData.description !== "" &&
        updateData.monthYear !== "" &&
        updateData.pdfFile !== ""
      ) {
        dispatch(inventoryUpdate(updateData, closeModal));
        dispatch(fetchInventory());
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
              <MDBModalTitle>Create Inventory</MDBModalTitle>
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
                    <label htmlFor="">Month</label>
                    <MonthYearPicker
                      handleChange={(e) => setUpdateDate(e)}
                      startDate={updateDate}
                      clsname={true}
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
                    type="file"
                    label="File Uploader"
                    changeValue={handlePdfChange}
                    col={12}
                    name="fileUploader"
                    validate={true}
                    id="formId"
                    reff={ref}
                  />
                  {/* <div className="form-group">
                    <div className="fileUploader">
                      <label htmlFor="pdfImage" className="img">
                        <input
                          type="file"
                          id="pdfImage"
                          onChange={handlePdfChange}
                          accept=".pdf"
                        />
                        <img src={PDF} alt="" />
                        <p>{fileName}</p>
                      </label>
                    </div>
                  </div> */}
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
              <MDBBtn onClick={inventoryDataHandler}>
                Request for Approval
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
