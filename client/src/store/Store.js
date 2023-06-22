import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import RootReducers from "./reducers/Reducers";

export const store = createStore(RootReducers, {}, applyMiddleware(thunk));

export const persistor = persistStore(store);
