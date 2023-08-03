import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

const initialState = {
  isLogged: false,
  token: "",
  isLoading: false,
  current: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLoginRedux: (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.token = action.payload.token;
      state.current = action.payload.current;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCurrent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
        state.isLogged = true;
      })
      .addCase(actions.getCurrent.rejected, (state) => {
        state.isLoading = false;
        state.current = null;
        state.isLogin = false;
        state.token = null;
      });
  },
});

export const { handleLoginRedux } = userSlice.actions;
export default userSlice.reducer;
