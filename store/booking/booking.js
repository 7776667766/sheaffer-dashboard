import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyBooking } from "./constrants";
import toast from "react-hot-toast";

export const getMyBookingFunApi = createAsyncThunk(
  "booking/add",
  async () => {
    try {
      const response = await axios.get(getMyBooking);
      console.log("response in get My Booking => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log(
          "Error response in get My Booking Api => ",
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
      console.log("Error in get My Booking Api ", error);
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
