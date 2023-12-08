import { addspecialistApi, getspecialistApi } from "./services";
import { createSlice } from "@reduxjs/toolkit";

const specialistSlice = createSlice({
  name: "specialist",
  initialState: {
    specialist: [],
    isLoading: false,
    error: null,
    specialistFetch: false,
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
    builder
      .addCase(getspecialistApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getspecialistApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specialistFetch = true;
        state.specialist = action.payload;
      })
      .addCase(getspecialistApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.specialistFetch = true;
      });
  },
});

export const specialistReducer = specialistSlice.reducer;
