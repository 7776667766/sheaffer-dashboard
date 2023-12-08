import { createSlice } from "@reduxjs/toolkit";
import { addManagerFunApi } from "./services";

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    managers: [],
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
  },
});

export const managerReducer = managerSlice.reducer;
