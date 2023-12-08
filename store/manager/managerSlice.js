const { addManagerFunApi } = require("./services");

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    managers: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addManagerFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addManagerFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.managers = action.payload.managers;
      })
      .addCase(loginFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const managerReducer = managerSlice.reducer;
