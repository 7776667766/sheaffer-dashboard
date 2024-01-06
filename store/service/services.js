import {
  addserviceTypeApi,
  addservicesApi,
  deleteServiceApi,
  editServiceApi,
  getAllServiceApi,
  getsevicetypeApi,
  adddummyservicesApi
} from "./constrants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import toast from "react-hot-toast";
import axiosImage from "helper/api-image";

export const addservicesFunApi = createAsyncThunk(
  "Services/addservices",
  async ({ data, onSuccess }) => {
    console.log("Add Services value", data);
    try {
      const response = await axiosImage.post(addservicesApi, data);
      console.log("response in Add Service => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in add Services Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in Add Services Api ", error);
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

export const addDummyservicesFunApi = createAsyncThunk(
  "Services/adddummyservices",
  async ({ data, onSuccess }) => {
    console.log("Add Services value", data);
    try {
      const response = await axiosImage.post(adddummyservicesApi, data);
      console.log("response in Add dummy Service => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in add dummy Services Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in Add dummy Services Api ", error);
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

export const editServicesFunApi = createAsyncThunk(
  "services/editServices",
  async ({ data, onSuccess }) => {
    console.log("Edit services value", data);
    try {
      const response = await axiosImage.post(editServiceApi(data.id), data);
      console.log("response in edit Service => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in edit Service Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in edit Service Api ", error);
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

export const deleteServiceFunApi = createAsyncThunk(
  "services/deleteServices",
  async (id) => {
    console.log("delete services value", id);
    try {
      const response = await axios.get(deleteServiceApi(id));
      console.log("response in delete Service => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return id;
      } else {
        console.log("Error response in delete Service Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in delete Service Api ", error);
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
