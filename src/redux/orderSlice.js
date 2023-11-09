import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axiosPrivate";

export const fetchDistributorCredentials = createAsyncThunk(
  "order/fetchDistributorCredentials",
  async (id) => {
    const response = await axiosPrivate.get(`/distributors/${id}`);
    return response.data;
  },
);

const initialState = {
  search: "",
  distributor: {
    name: "...",
    inn: "...",
    region: "...",
    contact1: "...",
    contact2: "...",
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistributorCredentials.fulfilled, (state, action) => {
        state.distributor = action.payload;
      })
      .addCase(fetchDistributorCredentials.rejected, (state, action) => {
        console.log("fail");
        console.log(action);
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
