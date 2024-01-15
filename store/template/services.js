import { addtemplate, gettemplate, editTemplateApi, deleteTemplateApi } from "./constrants";
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

export const edittemplateFunApi = createAsyncThunk(
  "templates/editTemplateFunApi",
  async ({ data, onSuccess }) => {
    try {
      const response = await axiosImage.post(editTemplateApi(data.id), data);

      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log(
          "Error response in edit templates Api => ",
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
      console.log("Error in edit templates Api ", error);
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

export const deletetemplateFunApi = createAsyncThunk(
  "templates/deleteTemplates",
  async (id) => {
    console.log("delete templates value", id);
    try {
      const response = await axios.get(deleteTemplateApi(id));
      console.log("response in delete Template => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return id;
      } else {
        console.log("Error response in delete Template Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in delete Template Api ", error);
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
