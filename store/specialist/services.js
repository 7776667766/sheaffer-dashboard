import { addspecialist, getspecialist,editSpecialistApi,deleteSpecialistApi } from "./constrants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "helper/api";
import toast from "react-hot-toast";

export const addspecialistApi = createAsyncThunk(
  "Specialist/addspecialist",
  async ({ data, onSuccess }) => {
    console.log("Add Specialist value", data);
    try {
      const response = await axios.post(addspecialist, data);
      console.log("response in Add Specialist => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in add Specialist Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in Add Specialist Api ", error);
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

// <.................getspecialist......................>

export const getspecialistApi = createAsyncThunk(
  "specialist/getspecialist",
  async ({ data, onSuccess }) => {
    console.log("getspecialist value", data);
    try {
      const response = await axios.get(getspecialist(data));
      console.log("response in get specialist => ", response.data);
      if (response.data.status === "success") {
        if (onSuccess) {
          onSuccess(response.data.data);
        }
        return response.data.data;
      } else {
        console.log("Error response in get specialist Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in get specialist Api ", error);
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

export const editSpecialistFunApi = createAsyncThunk(
  "specialist/editspecialist",
  async ({ data, onSuccess }) => {          
    console.log(data,"data")
    try {
      const { id, ...restData } = data;
      console.log(id,"id of editapi")

      if (!data.id) {
        throw new Error('Invalid id provided for editing package');
      }

      const response = await axios.post(editSpecialistApi(data.id), restData);

      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log(
          "Error response in edit specialist=> ",
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
      console.log("Error in edit specialist", error);
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
export const deleteSpecialistFunApi = createAsyncThunk(
  "specialist/deletepackages",
  async (id) => {
    console.log("delete services type value", id);
    try {
      const response = await axios.get(deleteSpecialistApi(id));
      console.log("response in delete specialist type => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return id;
      } else {
        console.log(
          "Error response in delete specialist Api => ",
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
      console.log("Error in delete specialist Api ", error);
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
