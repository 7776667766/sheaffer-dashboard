import {
    addPlanFunApi,
    getAllPlanFunApi,
  } from "./plan";
  import { createSlice } from "@reduxjs/toolkit";
  
  const planSlice = createSlice({
    name: "plan",
    initialState: {
        plan: {
        data: [],
        isLoading: false,
        error: null,
        dataFatched: false,
      },
    },
  
    reducers: {},
  
    extraReducers: (builder) => {
      builder
        .addCase(addPlanFunApi.pending, (state, action) => {
          state.plan.isLoading = true;
          state.plan.error = null;
        })
        .addCase(addPlanFunApi.fulfilled, (state, action) => {
          console.log("Add Plan  Response", action.payload);
          state.plan.isLoading = false;
          state.plan.data.push(action.payload);
        })
        .addCase(addPlanFunApi.rejected, (state, action) => {
          state.plan.isLoading = false;
          state.plan.error = action.payload;
        });
      builder
        .addCase(getAllPlanFunApi.pending, (state, action) => {
          state.plan.isLoading = true;
          state.plan.error = null;
        })
        .addCase(getAllPlanFunApi.fulfilled, (state, action) => {
          state.plan.isLoading = false;
          state.plan.dataFatched = true;
          state.plan.data = action.payload;
        })
        .addCase(getAllPlanFunApi.rejected, (state, action) => {
          state.plan.isLoading = false;
          state.plan.error = action.payload;
          state.plan.dataFatched = true;
        })
    }
  });
  
  export const planReducer = planSlice.reducer;
  