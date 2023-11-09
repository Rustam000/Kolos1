import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axiosPrivate";

export const getDistributorById = createAsyncThunk(
  "return/getDistributorById",
  async (id) => {
    try {
      const response = await axiosPrivate.get(`/distributors/${id}`);
      return response.data;
    } catch (error) {
      console.warn(error);
      return Promise.reject(error);
    }
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

export const returnSlice = createSlice({
  name: "return",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDistributorById.fulfilled, (state, action) => {
        state.distributor = action.payload;
      })
      .addCase(getDistributorById.rejected, (state, action) => {
        console.log("getDistributorById failed");
        console.log(action);
      });
  },
});

export const returnReducer = returnSlice.reducer;
export const returnActions = returnSlice.actions;
