import { createSlice } from "@reduxjs/toolkit";
import {
  forgetPasswordFunApi,
  loginFunApi,
  logoutFunApi,
  resetPasswordFunApi,
  changePasswordFunApi,
  verifyOtpFunApi,
  updateProfileFunApi,
  checkTokenIsValidFunApi,
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
      .addCase(verifyOtpFunApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyOtpFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload !== undefined) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.isVerified = action.payload.user.verified;
          state.token = action.payload.token;
          state.role = action.payload.user.role;
          state.otpVerified = true;
          localStorage.setItem("otpVerified", true);
        }
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
    builder
      .addCase(forgetPasswordFunApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgetPasswordFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      })
      .addCase(forgetPasswordFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      });
    builder
      .addCase(resetPasswordFunApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      })
      .addCase(resetPasswordFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
        state.otpVerified = false;
      });

    builder
      .addCase(changePasswordFunApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changePasswordFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changePasswordFunApi.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateProfileFunApi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProfileFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isVerified = action.payload.verified;
        state.role = action.payload.role;
      })
      .addCase(updateProfileFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
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
