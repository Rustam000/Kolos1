import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDistributors = createAsyncThunk(
  "distributors/fetchDistributors",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jwt-authentication-beryl.vercel.app/api/distributors`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  distributors: [],
};

export const distributorsSlice = createSlice({
  name: "distributors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDistributors.fulfilled, (state, action) => {
      state.distributors = action.payload;
    });
  },
});

export const distributorsReducer = distributorsSlice.reducer;
export const distributorsActions = distributorsSlice.actions;
