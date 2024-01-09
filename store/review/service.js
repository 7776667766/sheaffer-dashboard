import axios from "helper/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyreview } from "./constrants";
import toast from "react-hot-toast";

export const getMyreviewsFunApi = createAsyncThunk(
  "review/Myreview",
  async (data) => {
    try {
      const response = await axios.get(getMyreview, data);
      console.log("response in get All Myreview => ", response.data);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        console.log("Error response in get all Myreview Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in get all Myreview Api ", error);
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

// export const getMyreviewsFunApi = createAsyncThunk(
//   "review/getReview",
//   async ({ data, onSuccess }) => {
//     try {
//       const response = await axios.get(getMyreview(data));
//       console.log("response in get Review=> ", response.data);
//       if (response.data.status === "success") {
//         if (onSuccess) {
//           onSuccess();
//         }
//         return response.data.data;
//       } else {
//         console.log("Error response in get Review Api => ", response.data);
//         const err =
//           response?.data?.message ||
//           response?.message ||
//           "Something went wrong!";
//         console.log("err: ", err);
//         toast.error(err);
//         throw new Error(err);
//       }
//     } catch (error) {
//       console.log("Error in get Review Api ", error);
//       let err =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Something went wrong!";
//       if (err === "Network Error") {
//         err = "Please check your internet connection";
//       }
//       toast.error(err);
//       throw new Error(err);
//     }
//   }
// );

