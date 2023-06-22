import React, { useEffect, useState } from "react";
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
import { ModalInput } from "../../../components/InputField";
import { DateMonthYearPicker } from "../../../components/datepicker/DateMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatedSale } from "../../../store/actions/all-actions/SalesAction";

const EditModal = (props) => {
  // Get modal and dispatch & Auth User
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let {
    invItem,
    updateDate,
    setUpdateDate,
    updateData,
    setUpdateData,
    editModal,
    setEditModal,
  } = props;

  let { description, amount } = updateData;

  const [markVerify, setMarkVerify] = useState(false);

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Clear form and close modal functions
  const clearForm = () => {
    setUpdateData({
      amount: 0,
      description: "",
    });
    setUpdateDate(new Date());
  };
  const closeModal = () => {
    setEditModal(!editModal);
    clearForm();
  };

  // Sale update function
  const updateSaleHandler = () => {
    let updateData = {
      _id: invItem?._id,
      amount: amount,
      description: description,
      email: invItem?.email,
      name: invItem?.name,
      status: "Non-Verified",
      code: "SL",
      timeStamp: new Date().toLocaleString(),
      date: updateDate.toLocaleDateString(),
    };

    if (
      updateData.amount !== 0 &&
      updateData.description !== "" &&
      updateData.date !== ""
    ) {
      dispatch(updatedSale(updateData, closeModal));
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

  // Sale verify update function
  const updateSaleVerifyHandler = () => {
    let updateData = {
      _id: invItem?._id,
      amount: amount,
      description: description,
      email: invItem?.email,
      name: invItem?.name,
      status: "Verified",
      timeStamp: new Date().toLocaleString(),
      date: updateDate.toLocaleDateString(),
    };
    if (invItem?.status !== "Verified") {
      if (
        updateData.amount !== 0 &&
        updateData.description !== "" &&
        updateData.status === "Verified" &&
        updateData.date !== ""
      ) {
        dispatch(updatedSale(updateData, closeModal));
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
    } else {
      toast.success("Verified", {
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

  useEffect(() => {
    const date = new Date();
    const days = date.getDate();

    if (days <= 5 || days >= 25) {
      setMarkVerify(true);
    }
  }, []);

  return (
    <>
      <MDBModal tabIndex="-1" show={editModal} setShow={setEditModal}>
        <MDBModalDialog centered size="lg fullscreen-md-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Data</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setEditModal(!editModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form_block">
                <MDBRow>
                  <MDBCol lg={6}>
                    <label htmlFor="">Date</label>
                    <DateMonthYearPicker
                      handleChange={(e) => setUpdateDate(e)}
                      startDate={updateDate}
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
              <>
                {markVerify === true ||
                invItem?.status === "Verified" ? null : (
                  <span>This will be able to mark after 25</span>
                )}

                <MDBBtn
                  className={invItem?.status === "Verified" && "btn-success"}
                  disabled={
                    markVerify === true || invItem?.status === "Verified"
                      ? false
                      : true
                  }
                  onClick={updateSaleVerifyHandler}
                >
                  Mark Verified
                </MDBBtn>
              </>
              <MDBBtn color="secondary" onClick={closeModal}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={updateSaleHandler}>Update</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditModal;
