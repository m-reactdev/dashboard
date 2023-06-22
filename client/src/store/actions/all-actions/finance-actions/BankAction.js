import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../components/config/BASE_URL";
import { FETCH_BANK } from "../../actions-types/ActionType";

const fetchBank = () => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/bank/fetch-bank`;

      let response = await axios({
        method: "GET",
        url: apiUrl,
      });

      if (response) {
        let budget = response.data.data;
        dispatch({
          type: FETCH_BANK,
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

const createBank = (data, closeModal, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/bank/create-bank`;
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/bank/fetch-bank`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_BANK,
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
        socket.emit("fetch_bank");
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

const updateBank = (data, closeModal, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/bank/update-bank`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/bank/fetch-bank`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_BANK,
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
        socket.emit("fetch_bank");
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

const deleteBank = (data, deleteModal, setDeleteModal, socket) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/bank/delete-bank/${data._id}`;
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/bank/fetch-bank`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let budget = response.data.data;
            dispatch({
              type: FETCH_BANK,
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
        socket.emit("fetch_bank");
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

export { createBank, fetchBank, updateBank, deleteBank };
