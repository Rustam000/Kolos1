import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDistributorById = createAsyncThunk(
  "distributor/getDistributorById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/distributor/${id}`,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
      return error;
    }
  },
);

const initialState = {
  error: null,
  isLoading: false,
};

export const distributorSlice = createSlice({
  name: "distributor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDistributorById.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(getDistributorById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getDistributorById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const distributorReducer = distributorSlice.reducer;
export const distributorActions = distributorSlice.actions;
