import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../components/config/BASE_URL";
import { FETCH_BUDGET } from "../../actions-types/ActionType";

const fetchBudget = () => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/budget/fetch-budget`;

      let response = await axios({
        method: "GET",
        url: apiUrl,
      });

      if (response) {
        let budget = response.data.data;
        dispatch({
          type: FETCH_BUDGET,
          payload: budget,
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

const createBudget = (data, closeModal, authUser, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/budget/create-budget`;
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/budget/fetch-budget`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_BUDGET,
              payload: budget,
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
        {
          socket && authUser.access !== true
            ? socket.emit("create_budget", {
                message: `${data.name} create budget for approval.`,
              })
            : socket.emit("fetch_budget");
        }
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

const updateBudget = (data, closeModal, authUser, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/budget/update-budget`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/budget/fetch-budget`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_BUDGET,
              payload: budget,
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
        {
          socket && authUser.access !== true
            ? socket.emit("update_budget", {
                message: `${data.name} update budget for approval.`,
              })
            : socket.emit("fetch_budget");
        }
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

const deleteBudget = (data, deleteModal, setDeleteModal, authUser, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/budget/delete-budget/${data._id}`;
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/budget/fetch-budget`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_BUDGET,
              payload: budget,
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
        {
          socket && authUser.access !== true
            ? socket.emit("delete_budget", {
                message: `${data.name} delete budget data.`,
              })
            : socket.emit("fetch_budget");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data.message, {
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

export { createBudget, fetchBudget, updateBudget, deleteBudget };
