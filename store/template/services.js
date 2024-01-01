import { addtemplate, gettemplate } from "./constrants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import toast from "react-hot-toast";
import axiosImage from "helper/api-image";

export const addtemplateApi = createAsyncThunk(
  "Template/addtemplate",
  async ({ data, onSuccess }) => {
    console.log("Add Template value", data);
    try {
      const response = await axiosImage.post(addtemplate, data);
      console.log("response in Add Template => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in add Template Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in Add Template Api ", error);
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

export const getAllTemplateFunApi = createAsyncThunk(
  "templates/AllTemplate",
  async (data) => {
    try {
      const response = await axios.get(gettemplate);
      console.log("response in get All Template => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log(
          "Error response in get all Template   Api => ",
          response.data
        );
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in get all Template   Api ", error);
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