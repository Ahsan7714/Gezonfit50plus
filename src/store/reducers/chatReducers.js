import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../baseUrl";

const initialState = {
  loading: false,
  error: "",
  messages: [],
  communityConversation: null,
};

// Async action to send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, text }, thunkAPI) => {
    try {
      const response = await axios.post(`${baseurl}/messages/community`, { senderId, text }, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action to fetch messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseurl}/messages/community`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action to fetch community conversation
export const fetchCommunityConversation = createAsyncThunk(
  "chat/fetchCommunityConversation",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseurl}/conversation/community`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chatReducer",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.loading = false;
      state.messages = [];
      state.communityConversation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCommunityConversation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommunityConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.communityConversation = action.payload;
      })
      .addCase(fetchCommunityConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatReducer.reducer;
export const { clearState } = chatReducer.actions;
