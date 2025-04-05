import { combineReducers } from "@reduxjs/toolkit";
import baseApi from "../api/baseApi";
import authReducer from "@/redux/features/auth/authSlice";
import categoryReducer from "@/redux/features/cause/causeCategorySlice"

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  category: categoryReducer, 
});

export default rootReducer;
