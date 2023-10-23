import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  /**@type {string|null} */
  user: localStorage.getItem("user"),
  /**@type {string|null} */
  accessToken: null,
  /**@type {string|null} */
  error: null,
  /**@type {number} */
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
      return { ...initialState, user: null };
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

export const logUserIn = createAsyncThunk(
  "auth/logUserIn",
  async (formData, thunkAPI) => {
    thunkAPI.dispatch(authActions.logUserIn(formData));
    if (formData.login === "dev" && formData.password === "dev") {
      localStorage.setItem("user", "dev");
    }
  },
);

export const logUserOut = createAsyncThunk(
  "auth/logUserOut",
  async (_, thunkAPI) => {
    localStorage.removeItem("user");
    thunkAPI.dispatch(authActions.logUserOut());
  },
);
