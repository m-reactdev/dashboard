import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../components/config/BASE_URL";

const fetchInventory = () => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/inventory/fetch-inventory`;

      let response = await axios({
        method: "GET",
        url: apiUrl,
      });

      if (response) {
        let inventory = response.data.data;
        dispatch({
          type: "FETCH_INVENTORY",
          payload: inventory,
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

const inventoryCreate = (data, socket, closeModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/inventory/create-inventory`;
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/inventory/fetch-inventory`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let inventory = response.data.data;
            dispatch({
              type: "FETCH_INVENTORY",
              payload: inventory,
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
        socket.emit("create_inventory", {
          message: `you have received a notification from ${data.name}`,
          name: data.name,
          description: `${data.name} create new file.`,
        });
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

const inventoryUpdate = (data, closeModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/inventory/update-inventory`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/inventory/fetch-inventory`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let inventory = response.data.data;
            dispatch({
              type: "FETCH_INVENTORY",
              payload: inventory,
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

const inventoryDelete = (id, socket, deleteModal, setDeleteModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/inventory/delete-inventory/${id}`;
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/inventory/fetch-inventory`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let inventory = response.data.data;
            dispatch({
              type: "FETCH_INVENTORY",
              payload: inventory,
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
        socket.emit("delete_inventory");
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

export { inventoryCreate, fetchInventory, inventoryUpdate, inventoryDelete };
