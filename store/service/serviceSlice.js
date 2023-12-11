import {  addservicesFunApi, getServicesTypeFunApi} from './services';
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
      builder
      .addCase(getServicesTypeFunApi.pending, (state, action) => {
       state.serviceType.isLoading = true;
       state.serviceType.error = null;
      })
      .addCase(getServicesTypeFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceType.dataFetch = true;
        state.serviceType.data = action.payload;
      })
      .addCase(getServicesTypeFunApi.rejected, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.error = action.payload;
        state.serviceType.dataFetch = true;
      });
   
  },
});

export const serviceReducer = serviceSlice.reducer;
