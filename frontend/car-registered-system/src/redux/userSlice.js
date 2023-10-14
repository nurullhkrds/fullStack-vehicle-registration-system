import { createSlice } from "@reduxjs/toolkit";
import { changePassword, loginAuth, registerAuth } from "../service";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    //auth Register
    registerUser: null,
    registerStatus: "idle",
    registerError: null,

    //auth login
    loginUser: null,
    loginStatus: "idle",
    loginError: null,
  },

  //change password message...
  changePasswordMessage: null,
  changePasswordStatus: "idle",
  changePasswordError: null,

  extraReducers: {
    //Auth register
    [registerAuth.pending]: (state, action) => {
      state.registerStatus = "loading";
    },
    [registerAuth.fulfilled]: (state, action) => {
      state.registerUser = action.payload;
      state.registerStatus = "succes";
    },
    [registerAuth.rejected]: (state, action) => {
      state.registerStatus = "failed";
      state.registerError = action.error.message;
    },

    //auth login
    [loginAuth.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [loginAuth.fulfilled]: (state, action) => {
      state.loginUser = action.payload;
      state.loginStatus = "succes";
    },
    [loginAuth.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.loginError = action.error.message;
    },

    //change password
    [changePassword.pending]: (state, action) => {
      state.changePasswordStatus = "loading";
    },
    [changePassword.fulfilled]: (state, action) => {
      state.changePasswordMessage = action.payload;
      state.changePasswordStatus = "succes";
    },
    [changePassword.rejected]: (state, action) => {
      state.changePasswordStatus = "failed";
      state.changePasswordError = action.error.message;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
