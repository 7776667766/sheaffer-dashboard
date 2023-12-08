const { addspecialistApi } = require("../Specialist/Services");

const specialistSlice = createSlice({
  name: "specialist",
  initialState: {
    specialist: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addspecialistApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addspecialistApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specialist = action.payload.managers;
      })
      .addCase(addspecialistApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const specialistReducer = specialistSlice.reducer;
