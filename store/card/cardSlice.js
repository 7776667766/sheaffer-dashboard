import { getMyCardFunApi } from "./card";

const { createSlice } = require("@reduxjs/toolkit");

const cardSlice = createSlice({
    name: "card",
    initialState: {
        card: {
            data: [],
            isLoading: false,
            error: null,
            dataFatched: false,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyCardFunApi.pending, (state, action) => {
                state.card.isLoading = true;
                state.card.error = null;
            })
            .addCase(getMyCardFunApi.fulfilled, (state, action) => {
                state.card.isLoading = false;
                state.card.dataFatched = true;
                state.card.data = action.payload;
            })
            .addCase(getMyCardFunApi.rejected, (state, action) => {
                state.card.isLoading = false;
                state.card.error = action.payload;
                state.card.dataFatched = true;
            });
    },
});

export const cardReducer = cardSlice.reducer;
