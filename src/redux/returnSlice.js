import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axiosPrivate";
import { axiosDummy } from "../api/axiosDummy";
import { createPath } from "react-router-dom";

export const getDistributorById = createAsyncThunk(
  "return/getDistributorById",
  async (id) => {
    try {
      const response = await axiosPrivate.get(`/distributors/${id}/`);
      return response.data;
    } catch (error) {
      console.warn(error);
      return Promise.reject(error);
    }
  },
);

export const getOrderById = createAsyncThunk(
  "return/getOrderById",
  async ({ id, search }) => {
    try {
      const response = await axiosDummy.get(`/distributor/orders/${id}/`, {
        params: { search },
      });
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
  orderHistory: [],
  returnDraft: [],
  targetHoverRowId: "",
};

export const returnSlice = createSlice({
  name: "return",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    updateOrderHistory: (state, action) => {
      const target = state.returnDraft;
      const source = state.orderHistory;
      target.forEach((item) => {
        const id = item.id;
        source.find((record) => record.id === id).quantity =
          item.maxQuantity - item.quantity;
      });
    },
    addItemToDraft: (state, action) => {
      const record = action.payload;
      const draft = state.returnDraft;
      const existingRecord = draft.find((item) => item.id === record.id);
      if (!existingRecord) {
        draft.push({
          ...record,
          maxQuantity: record.quantity,
          quantity: 1,
        });
      } else {
        if (existingRecord.quantity < existingRecord.maxQuantity) {
          existingRecord.quantity++;
        } else {
          return state;
        }
      }
    },
    removeItemFromDraft: (state, action) => {
      const record = action.payload;
      state.returnDraft = state.returnDraft.filter(
        (item) => item.id !== record.id,
      );
    },
    setQuantity: (state, action) => {
      const { id, value } = action.payload;
      const item = state.returnDraft.find((item) => item.id === id);
      if (value <= item.maxQuantity) {
        item.quantity = value;
      } else {
        item.quantity = item.maxQuantity;
      }
    },
    setTargetHoverRowId: (state, action) => {
      state.targetHoverRowId = action.payload;
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
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
      });
  },
});

export const returnReducer = returnSlice.reducer;
export const returnActions = returnSlice.actions;
