import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyBusiness, registerBusinessApi } from "./constrants";
import toast from "react-hot-toast";

export const getMyBussinessFunApi = createAsyncThunk(
  "business/getMyBussiness",
  async () => {
    try {
      const response = await axios.get(getMyBusiness);
      console.log("response in get My Bussiness => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log(
          "Error response in get My Bussiness Api => ",
          response.data
        );
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        if (err !== "Business not found") {
          toast.error(err);
        }
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in get My Bussiness Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      if (err !== "Business not found") {
        toast.error(err);
      }

      throw new Error(err);
    }
  }
);

export const regsiterBusinessFunApi = createAsyncThunk(
  "business/createBusiness",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(registerBusinessApi, data);
      console.log("response in create Business => ", response.data);
      if (response.data.status === "success") {
        toast.success("Business registed successfully");
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in create Business Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in create Business Api ", error);
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
