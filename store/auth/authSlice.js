import { createSlice } from "@reduxjs/toolkit";
import {
  loginFunApi,
  logoutFunApi,
  checkTokenIsValidFunApi,
  registerFunApi
} from "./services";

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
    validToken: {
      valid: false,
      isLoading: false,
      dataFetched: false,
    },
    allUsers: {
      data: [],
      isLoading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
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
      .addCase(registerFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
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

    builder
      .addCase(checkTokenIsValidFunApi.pending, (state, action) => {
        state.validToken.isLoading = true;
      })
      .addCase(checkTokenIsValidFunApi.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.validToken.isLoading = false;
        state.validToken.valid = true;
        state.validToken.dataFetched = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isVerified = action.payload.user.verified;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        state.otpVerified =
          localStorage.getItem("otpVerified")?.toString() === "true";
      })
      .addCase(checkTokenIsValidFunApi.rejected, (state, action) => {
        localStorage.removeItem("token");
        localStorage.removeItem("otpVerified");
        state.validToken.isLoading = false;
        state.validToken.valid = false;
        state.validToken.dataFetched = true;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      });

  },
});

export const authReducer = authSlice.reducer;
