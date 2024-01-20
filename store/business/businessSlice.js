import {
  getMyBussinessFunApi,
  regsiterBusinessFunApi,
  addBusinessFunApi,
  getallBussinessesFunApi,
  addCustomBusinessFunApi,
  addCustomBusinessApprovedFunApi,
} from "./services";

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
    builder
      .addCase(addBusinessFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBusinessFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.business = action.payload;
        state.dataFatched = true;
      })
      .addCase(addBusinessFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.business = null;
        state.error = action.payload;
        state.dataFatched = true;
      });
    // builder
    //   .addCase(getallBussinessesFunApi.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(getallBussinessesFunApi.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.business = action.payload;
    //     state.dataFatched = true;
    //   })
    //   .addCase(getallBussinessesFunApi.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.business = null;
    //     state.error = action.payload;
    //     state.dataFatched = true;
    //   });
    // builder
    //   .addCase(addCustomBusinessFunApi.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(addCustomBusinessFunApi.fulfilled, (state, action) => {
    //     console.log("85 payload", action.payload);
    //     state.isLoading = false;
    //     state.business = state.business?.map((ele) =>
    //       ele.id === action.payload.id ? action.payload : ele
    //     );
    //     state.dataFatched = true;
    //   })

    //   .addCase(addCustomBusinessFunApi.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.business = null;
    //     state.error = action.payload;
    //     state.dataFatched = true;
    //   });

    // builder
    //   .addCase(addCustomBusinessApprovedFunApi.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(addCustomBusinessApprovedFunApi.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.business = state.business?.map((ele) =>
    //       ele.id === action.payload.id ? action.payload : ele
    //     );
    //   })
    //   .addCase(addCustomBusinessApprovedFunApi.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.business = null;
    //     state.error = action.payload;
    //     state.dataFatched = true;
    //   });
  },
});

export const businessReducer = businessSlice.reducer;
