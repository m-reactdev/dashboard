import React from "react";
import ReactDOM from "react-dom/client";
import 'react-tooltip/dist/react-tooltip.css'
import "devextreme/dist/css/dx.light.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/style.min.css";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/Store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
