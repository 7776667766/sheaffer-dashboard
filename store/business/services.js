import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyBusiness } from "./constrants";
import toast from "react-hot-toast";

export const getMyBussinessFunApi = createAsyncThunk(
  "business/getMyBussiness",
  async () => {
    try {
      const response = await axios.get(getMyBusiness);
      console.log("response in get My Bussiness => ", response.data);
      if (response.data.status === "success") {
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
        toast.error(err);
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
      toast.error(err);
      throw new Error(err);
    }
  }
);
