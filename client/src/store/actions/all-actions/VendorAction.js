import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../components/config/BASE_URL";

const fetchVendors = () => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/vendor/fetch-vendors`;

      let response = await axios({
        method: "GET",
        url: apiUrl,
      });

      if (response) {
        let vendors = response.data.data;
        dispatch({
          type: "FETCH_VENDORS",
          payload: vendors,
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

const CreateVendor = (data, closeModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/vendor/create-vendor`;
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/vendor/fetch-vendors`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let vendors = response.data.data;
            dispatch({
              type: "FETCH_VENDORS",
              payload: vendors,
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

const vendorUpdated = (data, closeModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/vendor/update-vendor`;
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/vendor/fetch-vendors`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let vendors = response.data.data;
            dispatch({
              type: "FETCH_VENDORS",
              payload: vendors,
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

const vendorDelete = (id, deleteModal, setDeleteModal) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/vendor/delete-vendor/${id}`;
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
      });

      if (response && response.status === 200) {
        try {
          let apiUrl = `${BASE_URL}/api/vendor/fetch-vendors`;

          let response = await axios({
            method: "GET",
            url: apiUrl,
          });

          if (response) {
            let vendors = response.data.data;
            dispatch({
              type: "FETCH_VENDORS",
              payload: vendors,
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

export { CreateVendor, fetchVendors, vendorDelete, vendorUpdated };
