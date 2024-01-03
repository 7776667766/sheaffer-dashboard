import { getMyBussinessFunApi, regsiterBusinessFunApi } from "./services";

const { createSlice } = require("@reduxjs/toolkit");

const businessSlice = createSlice({
  name: "business",
  initialState: {
    business: null,
    isLoading: false,
    error: null,
    dataFatched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBussinessFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyBussinessFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.business = action.payload;
        state.dataFatched = true;
      })
      .addCase(getMyBussinessFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.business = null;
        state.error = action.payload;
        state.dataFatched = true;
      });
    builder
      .addCase(regsiterBusinessFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(regsiterBusinessFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.business = action.payload;
        state.dataFatched = true;
      })
      .addCase(regsiterBusinessFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.business = null;
        state.error = action.payload;
        state.dataFatched = true;
      });
  },
});

export const businessReducer = businessSlice.reducer;
