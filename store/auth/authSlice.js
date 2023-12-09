import { createSlice } from "@reduxjs/toolkit";
import {
  forgetPasswordFunApi,
  loginFunApi,
  logoutFunApi,
  resetPasswordFunApi,
  changePasswordFunApi,
  verifyOtpFunApi,
  updateProfileFunApi,
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
    allUsers: {
      data: [],
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    login: (state, action) => {
      const token = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      let otpVerified = localStorage.getItem("otpVerified");
      console.log("otpVerified: ", otpVerified);
      if (token === null || user === null) return;
      user = JSON.parse(user);
      state.isAuthenticated = true;
      state.token = token;
      state.user = user;
      state.isVerified = user.verified;
      state.role = user.role;
      state.otpVerified = otpVerified;
    },
    // logout: (state) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.isVerified = false;
    //   state.token = null;
    //   state.role = null;
    //   state.otpVerified = false;
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    // },
  },
  extraReducers: (builder) => {
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
    // builder.addDefaultCase((state, action) => {
    //   state.isLoading = false;
    // });

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
  },
});


export const { login } = authSlice.actions;

export const authReducer = authSlice.reducer;
