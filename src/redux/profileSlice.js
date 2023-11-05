import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDistributorById = createAsyncThunk(
  "profile/getDistributorById",
  async (distributorId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/distributors/${distributorId}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  distributorInfo: {
    name: "...",
    inn: "...",
    region: "...",
    contact1: "...",
    contact2: "...",
  },
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDistributorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDistributorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorInfo = action.payload;
      })
      .addCase(getDistributorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Не удалось загрузить данные о дистрибьюторе";
      });
  },
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
