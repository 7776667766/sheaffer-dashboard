import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  resetPasswordApi,
  verifyOtpApi,
  changePasswordApi,
  updateprofileApi,
  checkTokenIsValidApi,
  autoLoginApi,
} from "./constrants";
import toast from "react-hot-toast";
import axiosImage from "helper/api-image";
import { useRouter } from "next/router";

export const loginFunApi = createAsyncThunk(
  "auth/login",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(loginApi, data);
      console.log("response in loginFun => ", response.data);
      if (response.data.status === "success") {
        const responseData = response.data.data;
        if (responseData.user.role !== "user") {
          if (onSuccess) {
            onSuccess(responseData.user.phone);
          }
          return;
        } else {
          toast.error("You are not authorized to access dashboard");
          throw new Error("You are not authorized to access dashboard");
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
      console.log("Error in login Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

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
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const logoutFunApi = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(logoutApi);
    console.log("response in logoutFun => ", response.data);
    localStorage.removeItem("token");
    localStorage.removeItem("otpVerified");
    toast.success("Account Logout Successfully");
    window.location.reload();
    return;
  } catch (error) {
    console.log("Error in logout Api", error);
    let err =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong!";
    if (err === "Network Error") {
      err = "Please check your internet connection";
    } else if (err === "Invalid token") {
      localStorage.removeItem("token");
      localStorage.removeItem("otpVerified");
      toast.success("Account Logout Successfully");
      return;
    }
    toast.error(err);
    throw new Error(err);
  }
});

export const checkTokenIsValidFunApi = createAsyncThunk(
  "auth/checkTokenIsValid",
  async () => {
    console.log("checkTokenIsValidFunApi");
    try {
      const response = await axios.get(checkTokenIsValidApi);
      console.log("response in checkTokenIsValidFun => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log(
          "Error response in checkTokenIsValidFun Api => ",
          response.data
        );
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in checkTokenIsValidFun Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }

      throw error;
    }
  }
);

export const autoLoginFunApi = createAsyncThunk(
  "auth/autoLogin",
  async ({ onSuccess }) => {
    try {
      const response = await axios.get(checkTokenIsValidApi);
      console.log("response in checkTokenIsValidFun => ", response.data);
      if (response.data.status === "success") {
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log(
          "Error response in checkTokenIsValidFun Api => ",
          response.data
        );
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in checkTokenIsValidFun Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }

      throw error;
    }
  }
);

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
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
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
      if (response.data.status === "success") {
        toast.success("Password Reset Successfully");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        console.log("Error response in resetPassword Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in resetPasswordFun Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const changePasswordFunApi = createAsyncThunk(
  "auth/changePassword",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.post(changePasswordApi, data);
      console.log("response in changePasswordFun => ", response.data);
      if (response.data.status === "success") {
        toast.success("Password Reset Successfully");
      } else {
        console.log("Error response in changePassword Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in changePasswordFun Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const updateProfileFunApi = createAsyncThunk(
  "auth/updateprofile",
  async ({ data }) => {
    console.log(data);
    try {
      const response = await axiosImage.post(updateprofileApi, data);
      console.log("response in updateprofileFun => ", response.data);
      if (response.data.status === "success") {
        toast.success("Update Profile Successfully");
        return response.data.data.user;
      } else {
        console.log("Error response in updateprofile Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in updateprofileFun Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);
