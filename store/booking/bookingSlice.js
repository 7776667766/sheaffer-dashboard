import {
  getMyBusinessBookingFunApi,
  deleteBookingFunApi,
  cancelBookingFunApi,
  completeBookingFunApi,
  getBookedTimeSlotFunApi,
  rescheduledBookingFunApi,
} from "./service";

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
    // bookedTimeSlots: {
    //   data: [],
    //   isLoading: false,
    //   error: null,
    //   dataFatched: false,
    // },
  },
  reducers: {},
  //All Booking Api
  extraReducers: (builder) => {
    builder
      .addCase(getMyBusinessBookingFunApi.pending, (state, action) => {
        state.booking.isLoading = true;
        state.booking.error = null;
      })
      .addCase(getMyBusinessBookingFunApi.fulfilled, (state, action) => {
        state.booking.isLoading = false;
        state.booking.dataFatched = true;
        state.booking.data = action.payload;
      })
      .addCase(getMyBusinessBookingFunApi.rejected, (state, action) => {
        state.booking.isLoading = false;
        state.booking.error = action.payload;
        state.booking.dataFatched = true;
      });
    //Delete Booking Api
    builder
      .addCase(deleteBookingFunApi.pending, (state, action) => {
        state.booking.isLoading = true;
        state.booking.error = null;
      })
      .addCase(deleteBookingFunApi.fulfilled, (state, action) => {
        state.booking.isLoading = false;
        state.booking.data = state.booking.data?.filter(
          (ele) => ele.id !== action.payload
        );
        state.booking.dataFatched = true;
      });

    builder
      .addCase(cancelBookingFunApi.pending, (state, action) => {
        state.booking.isLoading = true;
        state.booking.error = null;
      })
      .addCase(cancelBookingFunApi.fulfilled, (state, action) => {
        state.booking.isLoading = false;
        state.booking.data = state.booking.data?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.booking.dataFatched = true;
      })
      .addCase(cancelBookingFunApi.rejected, (state, action) => {
        state.booking.isLoading = false;
        state.booking.error = action.payload;
        state.booking.dataFatched = true;
      });

    //Complete Booking Api
    builder
      .addCase(completeBookingFunApi.pending, (state, action) => {
        state.booking.isLoading = true;
        state.booking.error = null;
      })
      .addCase(completeBookingFunApi.fulfilled, (state, action) => {
        state.booking.isLoading = false;
        state.booking.data = state.booking.data?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.booking.dataFatched = true;
      })
      .addCase(completeBookingFunApi.rejected, (state, action) => {
        state.booking.isLoading = false;
        state.booking.error = action.payload;
        state.booking.dataFatched = true;
      });

    //Resheduled Booking Api
    builder
      .addCase(rescheduledBookingFunApi.pending, (state, action) => {
        state.booking.isLoading = true;
        state.booking.error = null;
      })
      .addCase(rescheduledBookingFunApi.fulfilled, (state, action) => {
        state.booking.isLoading = false;
        state.booking.data = state.booking.data?.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
      })
      .addCase(rescheduledBookingFunApi.rejected, (state, action) => {
        state.booking.isLoading = false;
        state.booking.error = action.payload;
      });

    //Booked Time Slot Api
    // builder
    //   .addCase(getBookedTimeSlotFunApi.pending, (state, action) => {
    //     state.bookedTimeSlots.isLoading = true;
    //     state.bookedTimeSlots.error = null;
    //   })
    //   .addCase(getBookedTimeSlotFunApi.fulfilled, (state, action) => {
    //     state.bookedTimeSlots.isLoading = false;
    //     state.bookedTimeSlots.data = action.payload;
    //   })
    //   .addCase(getBookedTimeSlotFunApi.rejected, (state, action) => {
    //     state.bookedTimeSlots.isLoading = false;
    //     state.bookedTimeSlots.error = action.payload;
    //   });
  },
});

export const bookingReducer = bookingSlice.reducer;
