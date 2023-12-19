import { getMyBookingFunApi } from "./booking";

const { createSlice } = require("@reduxjs/toolkit");

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    business: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBookingFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyBookingFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.business = action.payload;
      })
      .addCase(getMyBookingFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.business = null;
        state.error = action.payload;
      });
  },
});

export const bookingReducer = bookingSlice.reducer;
