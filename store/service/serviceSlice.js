import {
  addServicesTypeFunApi,
  addservicesFunApi,
  editServicesFunApi,
  getAllServiceFunApi,
  getServicesTypeFunApi,
  deleteServiceFunApi,
  addDummyservicesFunApi,
  deleteServicTypeFunApi,
  editServicesTypeFunApi,
  getallServicesFunApi,
} from "./services";
import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    serviceType: {
      data: [],
      isLoading: false,
      error: null,
      dataFatched: false,
    },
    service: {
      data: [],
      isLoading: false,
      error: null,
      dataFatched: false,
    },
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllServiceFunApi.pending, (state, action) => {
        state.service.isLoading = true;
        state.service.error = null;
      })
      .addCase(getAllServiceFunApi.fulfilled, (state, action) => {
        state.service.isLoading = false;
        state.service.dataFatched = true;
        state.service.data = action.payload;
      })
      .addCase(getAllServiceFunApi.rejected, (state, action) => {
        state.service.isLoading = false;
        state.service.error = action.payload;
        state.service.dataFatched = true;
      });
    builder
      .addCase(addservicesFunApi.pending, (state, action) => {
        state.service.isLoading = true;
        state.service.error = null;
      })
      .addCase(addservicesFunApi.fulfilled, (state, action) => {
        state.service.isLoading = false;
        state.service.data.push(action.payload);
      })
      .addCase(addservicesFunApi.rejected, (state, action) => {
        state.service.isLoading = false;
        state.service.error = action.payload;
      });

    builder
      .addCase(editServicesFunApi.pending, (state, action) => {
        state.service.isLoading = true;
        state.service.error = null;
      })
      .addCase(editServicesFunApi.fulfilled, (state, action) => {
        state.service.isLoading = false;
        state.service.data = state.service.data?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(editServicesFunApi.rejected, (state, action) => {
        state.service.isLoading = false;
        state.service.error = action.payload;
        state.service.dataFatched = true;
      });
    builder
      .addCase(deleteServiceFunApi.pending, (state, action) => {
        state.service.isLoading = true;
        state.service.error = null;
      })
      .addCase(deleteServiceFunApi.fulfilled, (state, action) => {
        state.service.isLoading = false;
        state.service.data = state.service.data?.filter(
          (ele) => ele.id !== action.payload
        );
        state.service.dataFatched = true;
      })
      .addCase(deleteServiceFunApi.rejected, (state, action) => {
        state.service.isLoading = false;
        state.service.error = action.payload;
        state.service.dataFatched = true;
      });
      builder
      .addCase(getallServicesFunApi.pending, (state, action) => {
        state.service.isLoading = true;
        state.service.error = null;
      })
      .addCase(getallServicesFunApi.fulfilled, (state, action) => {
        state.service.isLoading = false;
        state.service.dataFatched = true;
        state.service.data = action.payload;
      })
      .addCase(getallServicesFunApi.rejected, (state, action) => {
        state.service.isLoading = false;
        state.service.error = action.payload;
        state.service.dataFatched = true;
      });

    // Servcie Type
    builder
      .addCase(getServicesTypeFunApi.pending, (state, action) => {
        state.serviceType.isLoading = true;
        state.serviceType.error = null;
      })
      .addCase(getServicesTypeFunApi.fulfilled, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.dataFatched = true;
        state.serviceType.data = action.payload;
      })
      .addCase(getServicesTypeFunApi.rejected, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.error = action.payload;
        state.serviceType.dataFatched = true;
      });
    builder
      .addCase(addServicesTypeFunApi.pending, (state, action) => {
        state.serviceType.isLoading = true;
        state.serviceType.error = null;
      })
      .addCase(addServicesTypeFunApi.fulfilled, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.data.push(action.payload);
      })
      .addCase(addServicesTypeFunApi.rejected, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.error = action.payload;
      });

    builder
      .addCase(editServicesTypeFunApi.pending, (state, action) => {
        state.serviceType.isLoading = true;
        state.serviceType.error = null;
      })
      .addCase(editServicesTypeFunApi.fulfilled, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.data = state.serviceType.data?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })  
      .addCase(editServicesTypeFunApi.rejected, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.error = action.payload;
        state.serviceType.dataFatched = true;
      });
    builder
      .addCase(deleteServicTypeFunApi.pending, (state, action) => {
        state.serviceType.isLoading = true;
        state.serviceType.error = null;
      })
      .addCase(deleteServicTypeFunApi.fulfilled, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.data = state.serviceType.data?.filter(
          (ele) => ele.id !== action.payload
        );
        state.serviceType.dataFatched = true;
      })
      .addCase(deleteServicTypeFunApi.rejected, (state, action) => {
        state.serviceType.isLoading = false;
        state.serviceType.error = action.payload;
        state.serviceType.dataFatched = true;
      });

    // Dummy Services

    builder
      .addCase(addDummyservicesFunApi.pending, (state, action) => {
        state.service.isLoading = true;
        state.service.error = null;
      })
      .addCase(addDummyservicesFunApi.fulfilled, (state, action) => {
        state.service.isLoading = false;
        state.service.data.push(action.payload);
      })
      .addCase(addDummyservicesFunApi.rejected, (state, action) => {
        state.service.isLoading = false;
        state.service.error = action.payload;
      });   
  },
});

export const serviceReducer = serviceSlice.reducer;
