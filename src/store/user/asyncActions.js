import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCurrent = createAsyncThunk(
  "user/getCurrent",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCurrentUser();
    if (response.err !== 0) {
      return rejectWithValue(response.message);
    }

    return response.data;
  },
);
