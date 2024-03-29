import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axiosPrivate";
import { axiosDummy } from "../api/axiosDummy";

export const getDistributorById = createAsyncThunk(
  "transaction/getDistributorById",
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

export const getOrdersById = createAsyncThunk(
  "transaction/getOrdersById",
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
  orderNumber: "",
  distributor: {
    name: "...",
    inn: "...",
    region: "...",
    contact1: "...",
    contact2: "...",
  },
  source: [],
  target: [],
  hoverRowId: "",
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    updateSource: (state, action) => {
      const target = state.target;
      const source = state.source;
      let anyMatches = false;
      target.forEach((item) => {
        const id = item.id;
        const sourceRecord = source.find((record) => record.id === id);
        if (sourceRecord) {
          anyMatches = true;
          sourceRecord.quantity = item.maxQuantity - item.quantity;
        }
      });
      if (!anyMatches) {
        return state;
      }
    },
    addItemToTarget: (state, action) => {
      const record = action.payload;
      const target = state.target;
      const existingRecord = target.find((item) => item.id === record.id);
      if (!existingRecord) {
        target.push({
          ...record,
          maxQuantity: record.quantity,
          quantity: 1,
          order_date: new Date().toLocaleDateString("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        });
      } else {
        if (existingRecord.quantity < existingRecord.maxQuantity) {
          existingRecord.quantity++;
        } else {
          return state;
        }
      }
    },
    removeItemFromTarget: (state, action) => {
      const { id } = action.payload;
      state.target = state.target.filter((targetItem) => {
        if (targetItem.id === id) {
          state.source.find((sourceItem) => sourceItem.id === id).quantity =
            targetItem.maxQuantity;
          return false;
        }
        return true;
      });
    },
    setQuantity: (state, action) => {
      const { id, value } = action.payload;
      const item = state.target.find((item) => item.id === id);
      if (value <= item.maxQuantity) {
        item.quantity = value;
      } else {
        item.quantity = item.maxQuantity;
      }
    },
    toggleCondition: (state, action) => {
      const id = action.payload.id;
      const currentCondition = action.payload.state;
      const isDefect = currentCondition === "Брак";
      state.target.find((item) => item.id === id).state = isDefect
        ? "Норма"
        : "Брак";
    },
    setHoverRowId: (state, action) => {
      state.hoverRowId = action.payload;
    },
    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    clearData: (state) => {
      Object.keys(state).forEach((key) => (state[key] = initialState[key]));
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
      .addCase(getOrdersById.fulfilled, (state, action) => {
        state.source = action.payload;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
export const transactionActions = transactionSlice.actions;
