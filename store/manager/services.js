import { createAsyncThunk } from "@reduxjs/toolkit";
import { addManager } from "./constrants";

export const addManagerFunApi = createAsyncThunk(
  "manager/addManager",
  async ({ data, onSuccess }) => {
    console.log("Add manager value", data);
    try {
      const response = await axios.post(addManager, data);
      console.log("response in Add Manager => ", response.data);
      if (onSuccess) {
        onSuccess();
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
