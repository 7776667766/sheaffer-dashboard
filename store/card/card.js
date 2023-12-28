import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyCard } from "./constrants";
import toast from "react-hot-toast";

export const getMyCardFunApi = createAsyncThunk(
  "card/getMyCardFunApi",
  async ({ data }) => {
    console.log("data in get My Card Api => ", data);
    try {
      const response = await axios.get(getMyCard, data);
      console.log("response in get Card => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log("Error response in get Card Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw err;
      }
    } catch (error) {
      console.log("Error in get Card Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw error;
    }
  }
);
