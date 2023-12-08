
import { createSlice } from "@reduxjs/toolkit";
import { addspecialistApi } from "../Specialist/Services";

const specialistSlice = createSlice({
  name: "specialist",
  initialState: {
    specialist: [],
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addspecialistApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addspecialistApi.fulfilled, (state, action) => {
        console.log("Add Specialist  Response", action.payload);
        state.isLoading = false;
        state.specialist.push(action.payload);
      })
      .addCase(addspecialistApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const specialistReducer = specialistSlice.reducer;
