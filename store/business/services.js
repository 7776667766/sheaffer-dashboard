import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyBusiness, registerBusinessApi, addBusinessApi , addCustomBusinessApiApproved, getallBusinesses , addCustomBusinessApi, customizeThemeApi  } from "./constrants";
import toast from "react-hot-toast";
import axiosImage from "helper/api-image";

export const getMyBussinessFunApi = createAsyncThunk(
  "business/getMyBussiness",
  async ({ onSuccess }) => {
    try {
      const response = await axios.get(getMyBusiness);
      console.log("response in get My Bussiness => ", response.data);
      if (response.data.status === "success") {
        if (onSuccess) {
          onSuccess(response.data.data.id);
        }
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
      const response = await axiosImage.post(registerBusinessApi, data);
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

export const addBusinessFunApi = createAsyncThunk(
  "business/addBusiness",
  async ({ data, onSuccess }) => {
    console.log("res data", data)
    try {
      const response = await axiosImage.post(addBusinessApi, data);

      console.log("response in create dummy Business => ", response.data);
      if (response.data.status === "success") {
        toast.success("dummy Business registed successfully");
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in create dummy Business Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in create dummy Business Api ", error);
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

export const getallBussinessesFunApi = createAsyncThunk(
  "business/getallBussinessess",
  async ({ onSuccess }) => {
    try {
      const response = await axios.get(getallBusinesses);
      console.log("response in get all Businesses => ", response.data);
      if (response.data.status === "success") {
        if (onSuccess) {
          onSuccess(response.data.data);
        }
        return response.data.data;
      } else {
        console.log(
          "Error response all Businesses Api => ",
          response.data.data
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
      console.log("Error in all Businesses", error);
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

export const addCustomBusinessFunApi = createAsyncThunk(
  "business/customBusiness",
  async ({ data, onSuccess }) => {
    console.log("res data", data)
    try {
      const response = await axios.post(addCustomBusinessApi, data);
      console.log("response in create custom business => ", response.data);
      if (response.data.status === "success") {
        toast.success("custom Business reject  successfully");
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in create custom Business reject  Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in create custom Business reject  Api ", error);
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

export const addCustomBusinessApprovedFunApi = createAsyncThunk(
  "business/customBusinessApproved",
  async ({ data, onSuccess }) => {
    console.log("res data", data)
    try {
      const response = await axios.post(addCustomBusinessApiApproved, data);
      console.log("response to custom business Approved => ", response.data);
      if (response.data.status === "success") {
        toast.success("custom business Approved successfully");
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error in response to Approved Custom Business successfully Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in response to Approved Custom Business Api ", error);
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
)

export const customizeThemeFunApi = createAsyncThunk(
  "theme/customizetheme",
  async ({ data, onSuccess }) => {
    console.log("res data", data)
    try {
      const response = await axios.post(customizeThemeApi, data);
      console.log("response to update customize Theme => ", response.data);
      if (response.data.status === "success") {
        toast.success("custom theme updated successfully");
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error in response to update Custom theme Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in response to update Custom theme Api ", error);
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
)