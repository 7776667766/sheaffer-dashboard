import { createAsyncThunk } from "@reduxjs/toolkit";
import { addManager } from "./constrants";
import axios from "helper/api";
import toast from "react-hot-toast";

export const addManagerFunApi = createAsyncThunk(
  "manager/addManager",
  async ({ data, onSuccess }) => {
    console.log("Add manager value", data);
    try {
      const response = await axios.post(addManager, data);
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
