import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDistributorCredentials = createAsyncThunk(
  'order/fetchDistributorCredentials',
  async (id) => {
    try {
      const response = await axios.get(`http://51.20.115.221/api/v1/distributors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getWarehouseItems = createAsyncThunk(
  'order/getWarehouseItems',
  async () => {
    try {
      const response = await axios.get('https://jwt-authentication-beryl.vercel.app/api/warehouse/');
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    distributor: null,
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistributorCredentials.fulfilled, (state, action) => {
        state.distributor = action.payload;
        state.error = null;
      })
      .addCase(fetchDistributorCredentials.rejected, (state, action) => {
        state.distributor = null;
        state.error = action.error.message;
      })
      .addCase(getWarehouseItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getWarehouseItems.rejected, (state, action) => {
        state.items = [];
        state.error = action.error.message;
      });
  },
});

export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
