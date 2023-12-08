import { getMyBussinessFunApi } from "./services";

const { createSlice } = require("@reduxjs/toolkit");

const businessSlice = createSlice({
  name: "business",
  initialState: {
    business: null,
    isLoading: false,
    error: null,
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
      })
      .addCase(getMyBussinessFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.business = null;
        state.error = action.payload;
      });
  },
});

export const businessReducer = businessSlice.reducer;
