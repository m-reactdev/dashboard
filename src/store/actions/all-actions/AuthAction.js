import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../components/URL/BASE_URL";

const registerUser = (data, clearForm, createModal, setCreateModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/create-user`;
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clearForm();
        setCreateModal(!createModal);
      }
    } catch (error) {
      if (error?.response?.status === 501) {
        toast.warn(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(error.message, {
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
};

const loginUser = (user) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/login-user`;

      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: user,
      });

      if (response) {
        let userData = response.data.data;
        dispatch({
          type: "LOGIN_USER",
          payload: userData,
        });
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      }
    } catch (error) {
      if (error?.response?.status !== 500 && error?.response?.status !== 501) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response.status === 500) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response.status === 501) {
        toast.error(error.response.data.message, {
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
};

const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT_USER",
    });
  };
};

const fetchUsers = () => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/fetch-users`;

      let response = await axios({
        method: "GET",
        url: apiUrl,
      });

      if (response) {
        let users = response.data.data;
        dispatch({
          type: "FETCH_USERS",
          payload: users,
        });
      }
    } catch (error) {
      toast.error(error.message, {
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
};

const updateUser = (data, editModal, setEditModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/update-user`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response) {
        // let user = response.data.data;
        // dispatch({
        //   type: "UPDATE_USERS",
        //   payload: user,
        // });
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditModal(!editModal);
      }
    } catch (error) {
      if (error?.response?.status === 500) {
        toast.warn(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error?.response?.status === 501) {
        toast.warn(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(error.message, {
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
};

const deleteUser = (id, deleteModal, setDeleteModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/delete-user/${id}`;
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
      });

      if (response) {
        // dispatch({
        //   type: "DELETE_USER",
        //   payload: id,
        // });
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setDeleteModal(!deleteModal);
      }
    } catch (error) {
      toast.warn(error?.response?.data.message, {
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
};

export {
  registerUser,
  loginUser,
  logoutUser,
  fetchUsers,
  updateUser,
  deleteUser,
};
