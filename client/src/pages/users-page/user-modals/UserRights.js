import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCheckbox,
  MDBModalFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Rights from "../user-rights/Rights";
import { updateUser } from "../../../store/actions/all-actions/AuthAction";
import { toast } from "react-toastify";

const UserRights = (props) => {
  // Get modal and dispatch
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let {
    openUserSetting,
    setOpenUserSetting,
    _id,
    updateName,
    updateEmail,
    updateRole,
    updatePassword,
    updateStatus,
    updateUserRights,
  } = props;

  // User Create States
  const [userRights, setUserRights] = useState([]);

  // Clear form and close modal functions
  let clearForm = () => {
    setUserRights([]);
  };
  const closeModal = () => {
    setOpenUserSetting(!openUserSetting);
    clearForm();
  };

  // Handle change functions
  const handleChange = (e) => {
    let checked = e.target.checked;
    let value = e.target.value;

    if (checked === true) {
      let cloneUserRights = userRights.slice(0);
      cloneUserRights.push(value);
      setUserRights(cloneUserRights);
    }

    if (checked === false) {
      let cloneUserRights = userRights.slice(0);
      let filter = cloneUserRights.filter((e) => e !== value);
      setUserRights(filter);
    }
  };

  const createUserRightHandler = () => {
    let updateData = {
      _id: _id,
      name: updateName,
      email: updateEmail,
      password: updatePassword,
      role: updateRole,
      status:
        updateStatus && updateStatus === "Pending" ? "Approved" : "Updated",
      userRights: userRights,
    };
    if (updateData.userRights.length > 0) {
      if (updateData.email === authUser?.email) {
        updateData.status = "Active";
        dispatch(updateUser(updateData, closeModal, authUser));
      } else {
        dispatch(updateUser(updateData, closeModal, authUser));
      }
    } else {
      toast.error("Please select at least one option.", {
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
    if (updateUserRights?.length > 0) {
      setUserRights(updateUserRights);
    } else {
      setUserRights([]);
    }
  }, []);

  return (
    <>
      <div className="user-rights-block">
        <div className="flex_ftr">
          <h4>{updateRole}</h4>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => setOpenUserSetting(!openUserSetting)}
            >
              Cancel
            </MDBBtn>
            <MDBBtn onClick={createUserRightHandler}>
              {updateStatus && updateStatus === "Pending"
                ? "Create User Rights"
                : "Update User Rights"}
            </MDBBtn>
          </MDBModalFooter>
        </div>

        <MDBRow>
          <Rights handleChange={handleChange} item={updateUserRights} />
        </MDBRow>
      </div>
    </>
  );
};

export default UserRights;
