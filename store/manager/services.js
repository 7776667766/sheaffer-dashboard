import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import toast from "react-hot-toast";
import {
  addManagerApi,
  deleteManagerApi,
  editManagerApi,
  getManagerApi,
} from "./constrants";

export const addManagerFunApi = createAsyncThunk(
  "manager/addManager",
  async ({ data, onSuccess }) => {
    console.log("Add manager value", data);
    try {
      const response = await axios.post(addManagerApi, data);
      console.log("response in Add Manager => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in add manager Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in Add Manager Api ", error);
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

export const editManagerFunApi = createAsyncThunk(
  "manager/editManager",
  async ({ data, onSuccess }) => {
    console.log("Edit manager value", data);
    try {
      const response = await axios.post(editManagerApi(), data);
      console.log("response in edit Manager => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in edit manager Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in edit Manager Api ", error);
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

export const getManagerFunApi = createAsyncThunk(
  "manager/getManager",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.get(getManagerApi(data));
      console.log("response in get Manager => ", response.data);
      if (response.data.status === "success") {
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in get manager Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in get Manager Api ", error);
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

export const deleteManagerFunApi = createAsyncThunk(
  "manager/deleteManager",
  async (data) => {
    try {
      const response = await axios.get(deleteManagerApi(data));
      console.log("response in  Delete Manager => ", response.data);
      if (response.data.status === "success") {
        toast.success("manager delete successfully");
        return data;
      } else {
        console.log("Error response in Delete manager Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in Delete Manager Api ", error);
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
