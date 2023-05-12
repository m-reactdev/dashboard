import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthReducer } from "./all-reducers/AuthReducers";
import { InventoryReducer } from "./all-reducers/InventoryReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthState", "InventoryState"],
};

const RootReducers = combineReducers({
  AuthState: AuthReducer,
  InventoryState: InventoryReducer,
});

export default persistReducer(persistConfig, RootReducers);
