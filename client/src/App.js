import React, { useEffect } from "react";
import Navigation from "./routes/Routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget } from "./store/actions/all-actions/finance-actions/BudgetAction";
import { fetchUsers } from "./store/actions/all-actions/AuthAction";
import { fetchExpenses } from "./store/actions/all-actions/finance-actions/ExpensesAction";

import io from "socket.io-client";
import { BASE_URL } from "./components/config/BASE_URL";
import { fetchBank } from "./store/actions/all-actions/finance-actions/BankAction";
var socket = io(BASE_URL, { transports: ["websocket"] });

function App() {
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  useEffect(() => {
    if (authUser && authUser.access === true) {
      socket.on("create_budget_message", (data) => {
        dispatch(fetchBudget());
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
      });

      socket.on("update_budget_message", (data) => {
        dispatch(fetchBudget());
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
      });

      socket.on("delete_budget_message", (data) => {
        dispatch(fetchBudget());
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
      });

      socket.on("login_user_message", (data) => {
        dispatch(fetchUsers());
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
      });

      socket.on("logout_user_message", (data) => {
        dispatch(fetchUsers());
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
      });

      socket.on("create_expense_message", (data) => {
        dispatch(fetchExpenses());
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
      });

      socket.on("update_expense_message", (data) => {
        dispatch(fetchExpenses());
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
      });

      socket.on("delete_expense_message", (data) => {
        dispatch(fetchExpenses());
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
      });
    }

    socket.on("fetch_budget_message", (data) => {
      dispatch(fetchBudget());
    });

    socket.on("fetch_bank_message", (data) => {
      dispatch(fetchBank());
    });

    socket.on("fetch_expense_message", (data) => {
      dispatch(fetchExpenses());
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
