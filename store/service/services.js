import {
  addserviceTypeApi,
  addservicesApi,
  getAllServiceApi,
  getsevicetypeApi,
} from "./constrants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import toast from "react-hot-toast";

export const addservicesFunApi = createAsyncThunk(
  "Services/addservices",
  async ({ data, onSuccess }) => {
    console.log("Add Services Type value", data);
    try {
      const response = await axios.post(addserviceTypeApi, data);
      console.log("response in Add Service Type => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log(
          "Error response in add Services Type Api => ",
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
      console.log("Error in Add Services Type Api ", error);
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

export const getAllServiceFunApi = createAsyncThunk(
  "services/All Service",
  async (data) => {
    try {
      const response = await axios.post(getAllServiceApi, data);
      console.log("response in get All Service => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log(
          "Error response in get all services  Api => ",
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
      console.log("Error in get all services  Api ", error);
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

export const addServicesTypeFunApi = createAsyncThunk(
  "Services/addservicesType",
  async ({ data, onSuccess }) => {
    console.log("Add Services Type value", data);
    try {
      const response = await axios.post(addserviceTypeApi, data);
      console.log("response in Add Service Type => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log(
          "Error response in add Services Type Api => ",
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
      console.log("Error in Add Services Type Api ", error);
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

export const getServicesTypeFunApi = createAsyncThunk(
  "services/servicestype",
  async () => {
    try {
      const response = await axios.get(getsevicetypeApi);
      console.log("response in add services type => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log(
          "Error response in get services type Api => ",
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
      console.log("Error in get services type Api ", error);
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
