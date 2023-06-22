import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthReducer } from "./all-reducers/AuthReducers";
import { InventoryReducer } from "./all-reducers/InventoryReducers";
import { SalesReducer } from "./all-reducers/SalesReducers";
import { SalesTargetReducer } from "./all-reducers/SalesTargetReducers.";
import { VendorReducer } from "./all-reducers/VendorReducers";
import { MarketingReducers } from "./all-reducers/MarketingReducers";
import { ComplianceReducers } from "./all-reducers/ComplianceReducers";
import { FinanceReducers } from "./all-reducers/finance-reducers/FinanceReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "AuthState",
    "InventoryState",
    "VendorState",
    "SalesState",
    "MarketingState",
    "SalesTargetState",
    "ComplianceState",
    "FinanceState",
  ],
};

const RootReducers = combineReducers({
  AuthState: AuthReducer,
  InventoryState: InventoryReducer,
  VendorState: VendorReducer,
  SalesState: SalesReducer,
  SalesTargetState: SalesTargetReducer,
  MarketingState: MarketingReducers,
  ComplianceState: ComplianceReducers,
  FinanceState: FinanceReducers,
});

export default persistReducer(persistConfig, RootReducers);
