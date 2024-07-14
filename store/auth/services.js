import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import {
  registerApi,
  loginApi,
  logoutApi,
  checkTokenIsValidApi,
} from "./constrants";
import toast from "react-hot-toast";
// import axiosImage from "helper/api-image";
// import { useRouter } from "next/router";


export const registerFunApi = createAsyncThunk(
  "/api/user/register",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(registerApi, data);
      console.log("response in registerApi => ", response.data);
      if (response.data.status === "success") {
        const responseData = response.data.data;
          if (onSuccess) {
            toast.success("Account Register Successfully");
            onSuccess(responseData.user);
          }
          return;
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


export const loginFunApi = createAsyncThunk(
  "/api/user/login",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(loginApi, data);
      console.log("response in loginFun => ", response.data);
      if (response.data.status === "success") {
        const responseData = response.data.data;
          if (onSuccess) {
            onSuccess(responseData.user.email);
          }
          return;
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


export const logoutFunApi = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(logoutApi);
    console.log("response in logoutFun => ", response.data);
    localStorage.removeItem("auth token");
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
      localStorage.removeItem("auth token");
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

