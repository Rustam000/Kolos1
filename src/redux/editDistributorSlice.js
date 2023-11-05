import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDistributorById = createAsyncThunk(
  "distributor/getDistributorById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/distributors/${id}/`,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
      return error;
    }
  },
);

export const createDistributor = createAsyncThunk(
  "distributor/createDistributor",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://51.20.115.221/api/v1/distributors/`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
      return error;
    }
  },
);

export const editDistributorById = createAsyncThunk(
  "distributor/editDistributorById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://51.20.115.221/api/v1/distributors/${id}/`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
      return error;
    }
  },
);

export const archiveDistributorById = createAsyncThunk(
  "distributor/archiveDistributorById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://51.20.115.221/api/v1/distributors/${id}/`,
        { ...formData, is_archived: true },
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
