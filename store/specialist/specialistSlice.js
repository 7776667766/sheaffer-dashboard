import { addspecialistApi, getspecialistApi,deleteSpecialistFunApi,editSpecialistFunApi } from "./services";
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
      builder
      .addCase(editSpecialistFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editSpecialistFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specialist = state.specialist?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(editSpecialistFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.dataFatched = true;
      });
    builder
      .addCase(deleteSpecialistFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSpecialistFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specialist = state.specialist?.filter(
          (ele) => ele.id !== action.payload
        );
        state.dataFatched = true;
      })
      .addCase(deleteSpecialistFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.dataFatched = true;
      });

  },
});

export const specialistReducer = specialistSlice.reducer;
