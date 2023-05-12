import React, { useEffect } from "react";
import Navigation from "./routes/Routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,
  inventoryNotify,
} from "./store/actions/all-actions/InventoryAction";
import { BASE_URL } from "./components/URL/BASE_URL";

var socket = io(BASE_URL, { transports: ["websocket"] });

function App() {
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  useEffect(() => {
    socket.on("create_message", (data) => {
      dispatch(fetchInventory());
      if (authUser && authUser.role === "Admin") {
        toast.info(data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });

    socket.on("delete_message", (data) => {
      dispatch(fetchInventory());
    });
  }, [socket]);

  return (
    <>
      <Navigation />
      <ToastContainer />
    </>
  );
}

export default App;
