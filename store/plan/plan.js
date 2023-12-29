import {

    addPlanApi,
    getAllPlanApi,
   
  } from "./constrants";
  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "helper/api";
  import toast from "react-hot-toast";
  import axiosImage from "helper/api-image";
  
  export const addPlanFunApi = createAsyncThunk(
    "Plan/addPlan",
    async ({ data, onSuccess }) => {
      console.log("addPlanvalue", data);
      try {
        const response = await axiosImage.post(addPlanApi, data);
        console.log("response in addPlan => ", response.data);
        if (response.data.status === "success") {
          toast.success(response.data.message);
          if (onSuccess) {
            onSuccess();
          }
          return response.data.data;
        } else {
          console.log("Error response in addPlan Api => ", response.data);
          const err =
            response?.data?.message ||
            response?.message ||
            "Something went wrong!";
          console.log("err: ", err);
          toast.error(err);
          throw new Error(err);
        }
      } catch (error) {
        console.log("Error in addPlan Api ", error);
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
  
  export const getAllPlanFunApi = createAsyncThunk(
    "plan/AllPlans",
    async (data) => {
      try {
  
        const response = await axios.get(getAllPlanApi, data);
        console.log("response in get All Plan => ", response.data);
        if (response.data.status === "success") {
          return response.data.data;
        } else {
          console.log(
            "Error response in get all Plan  Api => ",
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
        console.log("Error in get all Plan Api ", error);
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
  