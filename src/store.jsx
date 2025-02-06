// import { createStore } from "redux";
import accountReducer from "./features/accounts/acountSlice";
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
