import {
  addPlanFunApi,
  deletePackageFunApi,
  getAllPlanFunApi,
  editPackagesFunApi,
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
    builder
      .addCase(editPackagesFunApi.pending, (state, action) => {
        state.plan.isLoading = true;
        state.plan.error = null;
      })
      .addCase(editPackagesFunApi.fulfilled, (state, action) => {
        console.log("Edit Packages API Fulfilled", action.payload);
        state.plan.isLoading = false;
      
        const updatedData = action.payload?.data || action.payload;
      
        const editedItemIndex = state.plan.data.findIndex((ele) => ele._id === updatedData?.id);
      
        if (editedItemIndex !== -1) {
          state.plan.data[editedItemIndex] = updatedData;
        }
      
        state.plan.dataFatched = true;
      })
      
      
      
         
      .addCase(editPackagesFunApi.rejected, (state, action) => {
        state.plan.isLoading = false;
        state.plan.error = action.payload;
        state.plan.dataFatched = true;
      });

    builder
      .addCase(deletePackageFunApi.pending, (state, action) => {
        state.plan.isLoading = true;
        state.plan.error = null;
      })
      .addCase(deletePackageFunApi.fulfilled, (state, action) => {
        state.plan.isLoading = false;
        state.plan.data = state.plan.data?.filter(
          (ele) => ele._id !== action.payload
        );
        state.plan.dataFatched = true;
       
      })
      
      .addCase(deletePackageFunApi.rejected, (state, action) => {
        state.plan.isLoading = false;
        state.plan.error = action.payload;
        state.plan.dataFatched = true;
      });
  }
});

export const planReducer = planSlice.reducer;
