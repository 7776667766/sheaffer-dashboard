import {
  getMyBussinessFunApi,
  regsiterBusinessFunApi,
  addBusinessFunApi,
  getallBussinessesFunApi,
  addCustomBusinessFunApi,
  addCustomBusinessApprovedFunApi,
  customizeThemeFunApi,
} from "./services";

const { createSlice } = require("@reduxjs/toolkit");

const businessSlice = createSlice({
  name: "business",
  initialState: {
    business: {
      data: null,
      isLoading: false,
      error: null,
      dataFatched: false,
    },

    businessAll: {
      data: [],
      isLoading: false,
      error: null,
      dataFatched: false,
    },
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBussinessFunApi.pending, (state, action) => {
        state.business.isLoading = true;
        state.business.error = null;
      })
      .addCase(getMyBussinessFunApi.fulfilled, (state, action) => {
        console.log("get my business payload", action.payload);
        state.business.isLoading = false;
        state.business.data = action.payload;
        state.business.dataFatched = true;
      })
      .addCase(getMyBussinessFunApi.rejected, (state, action) => {
        state.business.isLoading = false;
        state.business.data = null;
        state.business.error = action.payload;
        state.business.dataFatched = true;
      });
    builder
      .addCase(regsiterBusinessFunApi.pending, (state, action) => {
        state.business.isLoading = true;
        state.business.error = null;
      })
      .addCase(regsiterBusinessFunApi.fulfilled, (state, action) => {
        state.business.isLoading = false;
        state.business.data = action.payload;
        state.business.dataFatched = true;
      })
      .addCase(regsiterBusinessFunApi.rejected, (state, action) => {
        state.business.isLoading = false;
        state.business.data = null;
        state.business.error = action.payload;
        state.business.dataFatched = true;
      });
    builder
      .addCase(addBusinessFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBusinessFunApi.fulfilled, (state, action) => {
        state.business.isLoading = false;
        state.business.data = action.payload;
        state.business.dataFatched = true;
      })
      .addCase(addBusinessFunApi.rejected, (state, action) => {
        state.business.isLoading = false;
        state.business.data = null;
        state.business.error = action.payload;
        state.business.dataFatched = true;
      });
    builder
      .addCase(getallBussinessesFunApi.pending, (state, action) => {
        state.businessAll.isLoading = true;
        state.businessAll.error = null;
      })
      .addCase(getallBussinessesFunApi.fulfilled, (state, action) => {
        state.businessAll.isLoading = false;
        state.businessAll.dataFatched = true;
        state.businessAll.data = action.payload;
        console.log(state.businessAll.data, "action.payload response all");
      })

      .addCase(getallBussinessesFunApi.rejected, (state, action) => {
        state.businessAll.isLoading = false;
        state.businessAll.data = null;
        state.businessAll.error = action.payload;
        state.businessAll.dataFatched = true;
      });
    builder
      .addCase(addCustomBusinessFunApi.pending, (state, action) => {
        state.businessAll.isLoading = true;
        state.businessAll.error = null;
      })
      .addCase(addCustomBusinessFunApi.fulfilled, (state, action) => {
        console.log("85 payload", action.payload);
        state.businessAll.isLoading = false;
        state.businessAll.data = state.businessAll.data?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.businessAll.dataFatched = true;
      })

      .addCase(addCustomBusinessFunApi.rejected, (state, action) => {
        state.businessAll.isLoading = false;
        state.businessAll.business = null;
        state.businessAll.error = action.payload;
        state.businessAll.dataFatched = true;
      });

    builder

      .addCase(addCustomBusinessApprovedFunApi.pending, (state, action) => {
        state.businessAll.isLoading = true;
        state.businessAll.error = null;
      })

      .addCase(addCustomBusinessApprovedFunApi.fulfilled, (state, action) => {
        state.businessAll.isLoading = false;
        state.businessAll.data = state.businessAll.data?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.businessAll.dataFatched = true;
      })

      .addCase(addCustomBusinessApprovedFunApi.rejected, (state, action) => {
        state.businessAll.isLoading = false;
        state.businessAll.business = null;
        state.businessAll.error = action.payload;
        state.businessAll.dataFatched = true;
      });

      //cutom theme api
      builder
      .addCase(customizeThemeFunApi.pending, (state, action) => {
        state.businessAll.isLoading = true;
        state.businessAll.error = null;
      })
      .addCase(customizeThemeFunApi.fulfilled, (state, action) => {
        console.log("85 payload", action.payload);
        state.businessAll.isLoading = false;
        state.businessAll.data = state.businessAll.data?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.businessAll.dataFatched = true;
      })

      .addCase(customizeThemeFunApi.rejected, (state, action) => {
        state.businessAll.isLoading = false;
        state.businessAll.business = null;
        state.businessAll.error = action.payload;
        state.businessAll.dataFatched = true;
      });
  },
});

export const businessReducer = businessSlice.reducer;
