import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersApi } from "./constraints";
import toast from "react-hot-toast";
import axios from "helper/api";

export const getAllUsersFunApi = createAsyncThunk(
  "auth/getAllUsers",
  async () => {
    try {
      const response = await axios.get(getAllUsersApi);
      console.log("response in getAllUsersFun => ", response.data);
      if (response.data.status === "success") {
        return response.data.data.users;
      } else {
        console.log("Error response in login Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in get all users Api ", error);
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
