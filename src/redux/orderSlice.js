import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDistributorCredentials = createAsyncThunk(
  "order/fetchDistributorCredentials",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `http://51.20.115.221/api/v1/distributor/${id}`,
    );
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
