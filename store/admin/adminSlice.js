import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersFunApi } from "./services";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsers: {
      data: [],
      isLoading: false,
      error: null,
      dataFatched: false,
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersFunApi.pending, (state, action) => {
        state.allUsers.isLoading = true;
        state.allUsers.error = null;
      })
      .addCase(getAllUsersFunApi.fulfilled, (state, action) => {
        state.allUsers.isLoading = false;
        state.allUsers.data = action.payload;
        state.allUsers.dataFatched = true;
      })
      .addCase(getAllUsersFunApi.rejected, (state, action) => {
        state.allUsers.isLoading = false;
        state.allUsers.error = action.payload;
        state.allUsers.dataFatched = true;
      });
  },
});

export const adminReducer = adminSlice.reducer;
