import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../components/config/BASE_URL";
import {
  FETCH_USERS,
  LOGIN_USER,
  LOGOUT_USER,
} from "../actions-types/ActionType";

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
          type: FETCH_USERS,
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

const registerUser = (data, closeModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/create-user`;
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/users/fetch-users`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let users = response.data.data;
            dispatch({
              type: FETCH_USERS,
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
        closeModal();
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

const loginUser = (user, socket) => {
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
          type: LOGIN_USER,
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
        {
          userData && userData.access !== true
            ? socket.emit("login_user", {
                message: `${userData.name} has been Login.`,
              })
            : socket.emit("fetch_user");
        }
      }
    } catch (error) {
      if (
        error?.response?.status !== 500 &&
        error?.response?.status !== 501 &&
        error?.response?.status !== 502
      ) {
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
      } else if (error.response.status === 502) {
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

const logoutUser = (authUser, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/logout-user`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: authUser,
      });

      if (response && response.status === 200) {
        dispatch({
          type: LOGOUT_USER,
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
        {
          authUser && authUser.access !== true
            ? socket.emit("logout_user", {
                message: `${authUser.name} has been logout.`,
              })
            : socket.emit("fetch_user");
        }
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

const updateUser = (data, closeModal, authUser) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/users/update-user`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        let updateData = response.data.data;
        try {
          let apiUrl = `${BASE_URL}/api/users/fetch-users`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let users = response.data.data;
            dispatch({
              type: FETCH_USERS,
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
        if (authUser?.email === updateData.email) {
          dispatch({
            type: LOGIN_USER,
            payload: updateData,
          });
        }
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
        closeModal();
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

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/users/fetch-users`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let users = response.data.data;
            dispatch({
              type: FETCH_USERS,
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
