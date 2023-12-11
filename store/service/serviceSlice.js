import {  addservicesFunApi } from './services';
import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    serviceType: {
        data: [],
        isLoading: false,
        error: null,
        dataFatched: false,
      }
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addservicesFunApi.pending, (state, action) => {
        state.serviceType.isLoading = true;
        state.serviceType.error = null;
      })
      .addCase(addservicesFunApi.fulfilled, (state, action) => {
        console.log("Add Services  Response", action.payload);
        state.serviceType.isLoading = false;
        state.serviceType.data.push(action.payload);
      })
      .addCase(addservicesFunApi.rejected, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.error = action.payload;
      });
   
  },
});

export const serviceReducer = serviceSlice.reducer;
