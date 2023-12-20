import { getMyBookingFunApi } from "./booking";

const { createSlice } = require("@reduxjs/toolkit");

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: {
      data: [],
      isLoading: false,
      error: null,
      dataFatched: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBookingFunApi.pending, (state, action) => {
        state.booking.isLoading = true;
        state.booking.error = null;
      })
      .addCase(getMyBookingFunApi.fulfilled, (state, action) => {
        state.booking.isLoading = false;
        state.booking.dataFatched = true;
        state.booking.data = action.payload;
      })
      .addCase(getMyBookingFunApi.rejected, (state, action) => {
        state.booking.isLoading = false;
        state.booking.error = action.payload;
        state.booking.dataFatched = true;
      });
  },
});

export const bookingReducer = bookingSlice.reducer;
