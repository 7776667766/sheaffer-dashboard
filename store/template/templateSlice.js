import { addtemplateApi, getAllTemplateFunApi, deletetemplateFunApi, edittemplateFunApi } from "./services";
import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    template: [],
    isLoading: false,
    error: null,
    templateFetch: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addtemplateApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addtemplateApi.fulfilled, (state, action) => {
        console.log("Add template  Response", action.payload);
        state.isLoading = false;
        state.template.push(action.payload);
      })
      .addCase(addtemplateApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //edit template
    builder
      .addCase(edittemplateFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(edittemplateFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.template = state.template?.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(edittemplateFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.dataFatched = true;
      });
    //delete template
    builder
      .addCase(deletetemplateFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletetemplateFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.template= state.template.filter(
          (ele) => ele.id !== action.payload
        );
        state.template.dataFatched = true;
      })
      .addCase(deletetemplateFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.dataFatched = true;
      });
    //get all templates
    builder
      .addCase(getAllTemplateFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTemplateFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templateFetch = true;
        state.template = action.payload;
      })
      .addCase(getAllTemplateFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.templateFetch = true;
      });
  },
});

export const templateReducer = templateSlice.reducer;
