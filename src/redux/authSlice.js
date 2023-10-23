import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logUserIn = createAsyncThunk(
  "auth/logUserIn",
  async (_, thunkAPI) => {
    const response = await axios.get(`https://example.com/api/`);
    return response.data;
  },
);

const initialState = {
  /**@type {string|null} */
  user: null,
  accessToken: null,
  error: null,
  failedAttempts: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      if (action.payload.login === "dev" && action.payload.password === "dev") {
        state.error = null;
        state.user = "dev";
      } else {
        state.user = null;
        state.failedAttempts += 1;
        state.error = state.failedAttempts >= 4 ? "access_denied" : "try_again";
      }
    },
    logUserOut: () => {
      //TODO: clear localstorage
      return initialState;
    },
    clearError: (state) => {
      if (state.error === "access_denied") return state;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
