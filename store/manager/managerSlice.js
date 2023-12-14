import { createSlice } from "@reduxjs/toolkit";
import {
  addManagerFunApi,
  deleteManagerFunApi,
  editManagerFunApi,
  getManagerFunApi,
} from "./services";

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    managers: [],
    managerFetch: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addManagerFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addManagerFunApi.fulfilled, (state, action) => {
        console.log("Add Manager Response", action.payload);
        state.isLoading = false;
        state.managers.push(action.payload);
      })
      .addCase(addManagerFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getManagerFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getManagerFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.managerFetch = true;
        state.managers = action.payload;
      })
      .addCase(getManagerFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.managerFetch = true;
      });
    builder
      .addCase(deleteManagerFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteManagerFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.managers = state.managers.filter(
          (manager) => manager.id !== action.payload
        );
      })
      .addCase(deleteManagerFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(editManagerFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editManagerFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.managerFetch = true;
        state.managers = state.managers.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.managers = action.payload;
      })
      .addCase(editManagerFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.managerFetch = true;
      });
  },
});

export const managerReducer = managerSlice.reducer;
