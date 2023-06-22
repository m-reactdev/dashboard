import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../components/config/BASE_URL";
import { FETCH_EXPENSES } from "../../actions-types/ActionType";

const fetchExpenses = () => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/expense/fetch-expenses`;

      let response = await axios({
        method: "GET",
        url: apiUrl,
      });

      if (response) {
        let budget = response.data.data;
        dispatch({
          type: FETCH_EXPENSES,
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

const createExpense = (data, closeModal, authUser, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/expense/create-expense`;
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/expense/fetch-expenses`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_EXPENSES,
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
            ? socket.emit("create_expense", {
                message: `${data.name} create expense for approval.`,
              })
            : socket.emit("fetch_expense");
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

const updateExpense = (data, closeModal, authUser, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/expense/update-expense`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/expense/fetch-expenses`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_EXPENSES,
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
            ? socket.emit("update_expense", {
                message: `${data.name} update expense for approval.`,
              })
            : socket.emit("fetch_expense");
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

const deleteExpense = (data, deleteModal, setDeleteModal, authUser, socket) => {
  console.log("first");
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/expense/delete-expense/${data._id}`;
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/expense/fetch-expenses`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_EXPENSES,
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
            ? socket.emit("delete_expense", {
                message: `${data.name} delete expense data.`,
              })
            : socket.emit("fetch_expense");
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

export { createExpense, fetchExpenses, updateExpense, deleteExpense };
