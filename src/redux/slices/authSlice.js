import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authLoading: false,
  modal: false,
  // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.signupData = value.payload;
    },
    setAuthLoading(state, value) {
      state.authLoading = value.payload;
    },
    setModal(state, value) {
      state.modal = value.payload;
    },
  },
});

export const { setUser, setAuthLoading, setModal } = authSlice.actions;

export default authSlice.reducer;
