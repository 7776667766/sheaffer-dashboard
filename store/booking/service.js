import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyBusinessBooking,
  deleteBookingApi,
  cancelBookingApi,
  getbookedslotsApi,
  complateBookingApi,
  reseheduledBookingApi,
} from "./constrants";
import toast from "react-hot-toast";

export const getMyBusinessBookingFunApi = createAsyncThunk(
  "booking/getMyBusinessBookingFunApi",
  async ({ data }) => {
    console.log("data", data);
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

export const deleteBookingFunApi = createAsyncThunk(
  "services/deleteServices",
  async (id) => {
    console.log("delete services value", id);
    try {
      const response = await axios.get(deleteBookingApi(id));
      console.log("response in delete Booking => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return id;
      } else {
        console.log("Error response in delete booking Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in delete booking Api ", error);
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

export const cancelBookingFunApi = createAsyncThunk(
  "booking/cancelbooking",
  async (id) => {
    console.log("cancel booking value", id);
    try {
      const response = await axios.get(cancelBookingApi(id));
      console.log("response in cancel Booking => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        console.log("Error response in cancel booking Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in cancel booking Api ", error);
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

export const completeBookingFunApi = createAsyncThunk(
  "booking/completeBooking",
  async (id) => {
    console.log("complete booking value", id);
    try {
      const response = await axios.get(complateBookingApi(id));
      console.log("response in complete Booking => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        console.log(
          "Error response in complete booking Api => ",
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
      console.log("Error in complete booking Api ", error);
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


export const rescheduledBookingFunApi = createAsyncThunk(
  "booking/resheduledBooking",
  async (id, data) => {
    console.log("resheduled id and data ", id, data);
    try {
      const response = await axios.patch(reseheduledBookingApi(id,data));
      console.log("response in resheduled booking => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        console.log(
          "Error response in resheduled booking Api => ",
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
      console.log("Error in resheduled booking Api ", error);
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

export const getBookedTimeSlotFunApi = createAsyncThunk(
  "Booking/getbookedTimeSlot",
  async ({ data, onSuccess }) => {
    console.log("getting booked TimeSlot Data", data);
    try {
      const response = await axios.post(getbookedslotsApi, data);
      console.log("response getting booked TimeSlots => ", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log(
          "Error response in booked TimeSlot Data Api => ",
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
      console.log("Error in  booked TimeSlot Data Api ", error);
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
