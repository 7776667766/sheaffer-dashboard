import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  resetPasswordApi,
  verifyOtpApi,
} from "./constrants";
import toast from "react-hot-toast";

export const loginFunApi = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(loginApi, data);
    console.log("response in loginFun => ", response.data);
    if (response.data.status === "success") {
      const responseData = response.data.data;
      if (responseData.user.role !== "user") {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        return responseData;
      } else {
        toast.error("You are not authorized to access dashboard");
        throw new Error("You are not authorized to access dashboard");
      }
    } else {
      console.log("Error response in login Api => ", response.data);
      const err =
        response?.data?.message || response?.message || "Something went wrong!";
      console.log("err: ", err);
      toast.error(err);
      throw new Error(err);
    }
  } catch (error) {
    console.log("Error in login Api ", error);
    const err =
      error.response.data.message || error?.message || "Something went wrong!";
    toast.error(err);
    throw new Error(err);
  }
});

export const verifyOtpFunApi = createAsyncThunk(
  "auth/verifyOtpApi",
  async ({ data, onSuccess }) => {
    console.log("value", data);
    try {
      const response = await axios.post(verifyOtpApi, data);
      console.log("response in verifyOtpApi => ", response.data);
      if (response.data.status === "success") {
        const responseData = response.data.data;

        if (responseData.user.role !== "user") {
          if (data.forLogin) {
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("user", JSON.stringify(responseData.user));
            toast.success("Otp Verifed Successfully");
            if (onSuccess) {
              onSuccess();
            }
            return responseData;
          } else {
            toast.success("Otp Verifed Successfully");
            if (onSuccess) {
              onSuccess();
            }
            return;
          }
        } else {
          const errorMsg = data.forLogin
            ? "You are not authorized to access dashboard"
            : "You are not authorized to reset password";
          toast.error(errorMsg);
          throw new Error(errorMsg);
        }
      } else {
        console.log("Error response in login Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in verifyOtpApi => ", error);
      const err =
        error.response.data.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const logoutFunApi = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(logoutApi);
    console.log("response in logoutFun => ", response.data);
    if (response.data.status === "success") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("otpVerified");
      toast.success("Account Logout Successfully");

      return;
    } else {
      console.log("Error response in logout Api => ", response.data);
      const err =
        response?.data?.message || response?.message || "Something went wrong!";
      console.log("err: ", err);
      toast.error(err);
      throw new Error(err);
    }
  } catch (error) {
    console.log("Error in logout Api ", error);
    const err =
      error.response.data.message || error?.message || "Something went wrong!";
    toast.error(err);
    throw new Error(err);
  }
});

export const forgetPasswordFunApi = createAsyncThunk(
  "auth/forgetPassword",
  async ({ data, onSuccess }) => {
    console.log("forgetPassword value", data);
    try {
      const response = await axios.post(forgotPasswordApi, data);
      console.log("response in forgetPasswordFun => ", response.data);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("Error in forgetPasswordFun Api ", error);
      const err =
        error.response.data.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const resetPasswordFunApi = createAsyncThunk(
  "auth/resetPassword",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(resetPasswordApi, data);
      console.log("response in resetPasswordFun => ", response.data);
      toast.success("Password Reset Successfully");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("Error in resetPasswordFun Api ", error);
      const err =
        error.response.data.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(err);
      throw new Error(err);
    }
  }
);
