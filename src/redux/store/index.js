import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // Make sure the path is correct

const store = configureStore({
  reducer: {
    auth: authReducer, // Use your auth reducer here
  },
});

export default store;