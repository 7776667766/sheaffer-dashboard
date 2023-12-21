import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyBusinessBooking } from "./constrants";
import toast from "react-hot-toast";

export const getMyBusinessBookingFunApi = createAsyncThunk(
  "booking/getMyBusinessBookingFunApi",
  async ({ data }) => {
    console.log("data in get My Booking Api => ", data);
    try {
      const response = await axios.post(getMyBusinessBooking, data);
      console.log("response in get My Booking => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log("Error response in get My Booking Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw err;
      }
    } catch (error) {
      console.log("Error in get My Booking Api ", error);
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
