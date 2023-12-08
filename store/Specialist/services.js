import { createAsyncThunk } from "@reduxjs/toolkit";
import { addspecialist } from "../Specialist/constrants";
import axios from "helper/api";
import toast from "react-hot-toast";

export const addspecialistApi = createAsyncThunk(
  "Specialist/addspecialist",
  async ({ data, onSuccess }) => {
    console.log("Add Specialist value", data);
    try {
      const response = await axios.post(addspecialist, data);
      console.log("response in Add Specialist => ", response.data);
      if (onSuccess) {
        onSuccess();
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