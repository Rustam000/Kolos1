import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDistributorInfo = createAsyncThunk(
  "distributor/fetchDistributorInfo",
  async (distributorId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/distributor/${distributorId}`
      );

      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
    name: "",
    region: "",
    contact1: null,
    contact2: null,
   distributorInfo: {},
  isLoading: false,
  error: null,
};

export const distributorSlice = createSlice({
  name: "distributor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistributorInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDistributorInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorInfo = action.payload;
      })
      .addCase(fetchDistributorInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Не удалось загрузить данные о дистрибьюторе";
      });
  },
});

export default distributorSlice.reducer;
export const distributorActions = distributorSlice.actions;
