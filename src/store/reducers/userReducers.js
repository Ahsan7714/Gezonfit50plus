import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../baseUrl";

const initialState = {
  loading: false,
  error: "",
  user : null,
  isNewsletterSubscribed: false,
  isContactUsSubmitted: false,
  isSignedIn: false,
  isSignUpped: false,
  isPartnerPosted: false,
  pendingPartners: [],
  activePartners: [],
  partners: [],
  isPartnerDeleted: false,
  activepartners: [],
  isInviteSent: false,
  acceptedInvites: [],
  activeEvent: [],
  isEventPosted: false,
  isActivePartnerDeleted: false,
};

// load user
export const loadUser = createAsyncThunk(
  "userReducer/loadUser",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/me`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.user);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// subscribe to newsletter
export const subscribeToNewsletter = createAsyncThunk(
  "userReducer/subscribeToNewsletter",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/newsletter`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// contact us
export const contactUs = createAsyncThunk(
  "userReducer/contactUs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/contact-us`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// sign up user
export const signUp = createAsyncThunk(
  "userReducer/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/register`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// sign in user
export const signIn = createAsyncThunk(
  "userReducer/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/login`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// post a pending partner
export const postPartner = createAsyncThunk(
  "userReducer/postPartner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/post-partner`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all pending partners
export const getPendingPartners = createAsyncThunk(
  "userReducer/getPendingPartners",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/get-partner`, {
        withCredentials: true,
      });
      console.log(data.pendingPartners);
      return fulfillWithValue(data.pendingPartners);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a partner
export const deletePartner = createAsyncThunk(
  "userReducer/deletePartner",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-partner/${id}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get  active partners
export const getActivePartners = createAsyncThunk(
  "userReducer/getActivePartners",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/active-partners`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activePartners);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get All active partners
export const getAllActivePartners = createAsyncThunk(
  "userReducer/getAllActivePartners",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/active-partners`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activepartners);

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// send invite on active post
export const sendInvite = createAsyncThunk(
  "userReducer/sendInvite",
  async ({id,data}, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}/user/active-partners/message/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all acceptedInvites
export const getAllInvites = createAsyncThunk(
  "userReducer/getAllInvites",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/messages/received`, {
        withCredentials: true,
      });
      console.log(data.acceptedInvites);
      return fulfillWithValue(data.acceptedInvites);

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all active events
export const getActiveEvents = createAsyncThunk(
  "userReducer/getActiveEvents",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/get-events`, {
        withCredentials: true,
      });
      console.log(data.activeEvent);
      return fulfillWithValue(data.activeEvent);

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// post an event
export const postEvent = createAsyncThunk(
  "userReducer/postEvent",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/post-event`, data, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete active partner of user
export const deleteActivePartner = createAsyncThunk(
  "userReducer/deleteActivePartner",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-active-partner/${id}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.loading = false;
      state.user = null;
      state.isNewsletterSubscribed = false;
      state.isContactUsSubmitted = false;
      state.isSignedIn = false;
      state.isSignUpped = false;
      state.isPartnerPosted = false;
      state.isPartnerDeleted = false;
      state.pendingPartners = [];
      state.activePartners = [];
      state.activepartners = [];
      state.isInviteSent = false;
      state.acceptedInvites = [];
      state.activeEvent = [];
      state.isEventPosted = false;
      state.isActivePartnerDeleted = false;

    },
  },
  extraReducers: (builder) => {
    // load user
    builder.addCase(loadUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // subscribe to newsletter
    builder.addCase(subscribeToNewsletter.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(subscribeToNewsletter.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isNewsletterSubscribed = true;
    });
    builder.addCase(subscribeToNewsletter.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
    });
    // contact us
    builder.addCase(contactUs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(contactUs.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isContactUsSubmitted = true;
    });
    builder.addCase(contactUs.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
    });
    // sign up user
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isSignUpped = true;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
    });
    // sign in user
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isSignedIn = true;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
    });
    // post a pending partner
    builder.addCase(postPartner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postPartner.fulfilled, (state, action) => {
      state.loading = false;
      state.isPartnerPosted = true;
    });
    builder.addCase(postPartner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get all pending partners
    builder
      .addCase(getPendingPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingPartners = action.payload;
      })
      .addCase(getPendingPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    // delete a partner
    builder.addCase(deletePartner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletePartner.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isPartnerDeleted = true;
    });
    builder.addCase(deletePartner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    // get all active partners
    builder.addCase(getActivePartners.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getActivePartners.fulfilled, (state, action) => {
      state.loading = false;
      state.activePartners = action.payload;
    });
    builder.addCase(getActivePartners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get all active partners
    builder.addCase(getAllActivePartners.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllActivePartners.fulfilled, (state, action) => {
      state.loading = false;
      state.activepartners = action.payload;
    });
    builder.addCase(getAllActivePartners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // send invite on active post
    builder.addCase(sendInvite.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendInvite.fulfilled, (state, action) => {
      state.loading = false;
      state.isInviteSent = true;
    });
    builder.addCase(sendInvite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get all acceptedInvites
    builder.addCase(getAllInvites.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllInvites.fulfilled, (state, action) => {
      state.loading = false;
      state.acceptedInvites = action.payload;
    });
    builder.addCase(getAllInvites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get all active events
    builder.addCase(getActiveEvents.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getActiveEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.activeEvent = action.payload;
    });
    builder.addCase(getActiveEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // post an event
    builder.addCase(postEvent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.isEventPosted = true;
    });
    builder.addCase(postEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // delete active partner of user
    builder.addCase(deleteActivePartner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteActivePartner.fulfilled, (state, action) => {
      state.loading = false;
      state.isActivePartnerDeleted = true;
    });
    builder.addCase(deleteActivePartner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default userReducer.reducer;
export const { clearState } = userReducer.actions;
