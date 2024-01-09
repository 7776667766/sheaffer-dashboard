import { getMyreviewsFunApi } from "./service";

const { createSlice } = require("@reduxjs/toolkit");

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: {
      data: [],
      isLoading: false,
      error: null,
      dataFatched: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyreviewsFunApi.pending, (state, action) => {
        state.review.isLoading = true;
        state.review.error = null;
      })
      .addCase(getMyreviewsFunApi.fulfilled, (state, action) => {
        state.review.isLoading = false;
        state.review.dataFatched = true;
        state.review.data = action.payload;
      })
      .addCase(getMyreviewsFunApi.rejected, (state, action) => {
        state.review.isLoading = false;
        state.review.error = action.payload;
        state.review.dataFatched = true;
      });
  },
});

export const reviewReducer = reviewSlice.reducer;
