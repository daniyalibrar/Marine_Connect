import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(state.admin));
    },
    logout: (state, action) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },
  },
});

export const { setAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
