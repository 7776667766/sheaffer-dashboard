import {  addservicesFunApi, getAllServiceFunApi, getServicesTypeFunApi} from './services';
import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    serviceType: {
        data: [],
        isLoading: false,
        error: null,
        dataFatched: false,
      },
      service: {
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
        state.serviceType.isLoading = false;
        state.serviceType.dataFatched = true;
        state.serviceType.data = action.payload;
      })
      .addCase(getServicesTypeFunApi.rejected, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.error = action.payload;
        state.serviceType.dataFatched = true;
      });
      builder
      .addCase(getAllServiceFunApi.pending, (state, action) => {
       state.service.isLoading = true;
       state.service.error = null;
      })
      .addCase(getAllServiceFunApi.fulfilled, (state, action) => {
        state.service.isLoading = false;
        state.service.dataFatched = true;
        state.service.data = action.payload;
      })
      .addCase(getAllServiceFunApi.rejected, (state, action) => {
        state.service.isLoading = false;
        state.service.error = action.payload;
        state.service.dataFatched = true;
      });
  },
});

export const serviceReducer = serviceSlice.reducer;
