import { createSlice } from "@reduxjs/toolkit";
import { loginFunApi, logoutFunApi, verifyOtpFunApi } from "./services";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    isVerified: false,
    otpVerified: false,
    token: null,
    role: null,
  },
  //   reducers: {
  //     login: (state, action) => {
  //       state.isAuthenticated = true;
  //       state.user = action.payload;
  //     },
  //     logout: (state) => {
  //       state.isAuthenticated = false;
  //       state.user = null;
  //       state.isVerified = false;
  //       state.token = null;
  //       state.role = null;
  //       state.otpVerified = false;
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //     },
  //   },
  extraReducers: (builder) => {
    //     // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(loginFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isVerified = action.payload.user.verified;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        state.otpVerified = false;
      })
      .addCase(loginFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      });
    builder
      .addCase(verifyOtpFunApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyOtpFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isVerified = action.payload.user.verified;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        state.otpVerified = true;
      })
      .addCase(verifyOtpFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      });
    builder
      .addCase(logoutFunApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      })
      .addCase(logoutFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      });
  },
});

// export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
