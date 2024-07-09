import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../baseUrl";


const initialState = {
  loading: false,
  error: "",
  users: [],
  totalUsers: 0,
  totalProducts: 0,
  totalPartners: 0,
  totalServices: 0,
  newsletter: [],
  pendingservices: [],
  activeservices: [],
  isPendingServiceDeleted: false,
  isPendingServiceUpdated: false,
  isActiveserviceDeleted: false,
  pendingevents: [],
  activeevents: [],
  isPendingEventDeleted: false,
  isPendingEventUpdated: false,
  isActiveEventDeleted: false,
  isEventPosted :false,
  pendingpartners :[],
  activepartners :[],
  isPendingPartnerDeleted :false,
  isPendingPartnerUpdated :false,
  isActivePartnerDeleted :false,
  activeproducts :[],
  pendingproducts :[],
  isPendingProductDeleted :false,
  isPendingProductUpdated :false,
  isActiveProductDeleted :false,
  isNewsletterDeleted :false,
  isBlogPosted :false,
  pendingblogs :[],
  activeblogs :[],
  isPendingBlogDeleted :false,
  isActiveBlogDeleted :false,
  isPendingBlogUpdated :false,
  isLoggedOut : false,
};

// delete all newsletter
export const deleteNewsletter = createAsyncThunk(
  "admin/deleteNewsletter",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/admin/delete-newsletters`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all users
export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/users`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.users);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get total products
export const getTotalProducts = createAsyncThunk(
  "admin/getTotalProducts",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseurl}/admin/total-active-products`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data.totalProducts);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get total partners
export const getTotalPartners = createAsyncThunk(
  "admin/getTotalPartners",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseurl}/admin/total-active-partners`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data.totalPartners);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get total services
export const getTotalServices = createAsyncThunk(
  "admin/getTotalServices",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseurl}/admin/total-active-services`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data.totalServices);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all newsletters
export const getNewsletters = createAsyncThunk(
  "admin/getNewsletters",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/newsletters`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.newsletter);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  get all pending services
export const getPendingServices = createAsyncThunk(
  "admin/getPendingServices",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/pending-services`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.pendingservices);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all active services
export const getActiveServices = createAsyncThunk(
  "admin/getActiveServices",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/active-services`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activeservices);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete pending service
export const deletePendingService = createAsyncThunk(
  "admin/deletePendingService",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/admin/delete-pending-service/${id}`,
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

//  delete active service
export const deleteActiveService = createAsyncThunk(
  "admin/deleteActiveService",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/admin/delete-active-service/${id}`,
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

// update pending service
export const updatePendingService = createAsyncThunk(
  "admin/updatePendingService",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseurl}/admin/update-service/${id}`,
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

// get all pending events
export const getPendingEvents = createAsyncThunk(
  "admin/getPendingEvents",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/pending-events`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.pendingevents);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update pending event
export const updatePendingEvent = createAsyncThunk(
  "admin/updatePendingEvent",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseurl}/admin/update-event/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete pending event
export const deletePendingEvent = createAsyncThunk(
  "admin/deletePendingEvent",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/admin/delete-event/${id}`,
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

// get all active events
export const getActiveEvents = createAsyncThunk(
  "admin/getActiveEvents",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/active-events`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activeevents);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete active event
export const deleteActiveEvent = createAsyncThunk(
  "admin/deleteActiveEvent",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/admin/delete-active-event/${id}`,
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

// post a event
export const postEvent = createAsyncThunk(
  "admin/postEvent",
  async (event, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/admin/post-event`, event, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all pending partners
export const getPendingPartners = createAsyncThunk(
  "admin/getPendingPartners",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/pending-partners`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.pendingpartners);
    } catch (error) {
      return rejectWithValue(error.response.data);
    } 
  }
);
// update pending partner
export const updatePendingPartner = createAsyncThunk(
  "admin/updatePendingPartner",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseurl}/admin/approve-partner/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all active partners
export const getActivePartners = createAsyncThunk(
  "admin/getActivePartners",
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

// delete pending partner
export const deletePendingPartner = createAsyncThunk(
  "admin/deletePendingPartner",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/admin/delete-pending-partner/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete active partner
export const deleteActivePartner = createAsyncThunk(
  "admin/deleteActivePartner",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/admin/delete-partner/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all pending products
export const getPendingProducts = createAsyncThunk(
  "admin/getPendingProducts",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/pending-products`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.pendingproducts);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// update pending product
export const updatePendingProduct = createAsyncThunk(
  "admin/updatePendingProduct",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseurl}/admin/update-product/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all active products
export const getActiveProducts = createAsyncThunk(
  "admin/getActiveProducts",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/active-products`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activeproducts);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete pending product
export const deletePendingProduct = createAsyncThunk(
  "admin/deletePendingProduct",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/admin/delete-pending-product/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete active product
export const deleteActiveProduct = createAsyncThunk(
  "admin/deleteActiveProduct",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/admin/delete-active-product/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// post active blog
export const postBlog = createAsyncThunk(
  "admin/postBlog",
  async (blog, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/admin/post-blog`, blog, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all pending blogs
export const getPendingBlogs = createAsyncThunk(
  "admin/getPendingBlogs",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/pending-blogs`, {
        withCredentials: true,  
      });
      return fulfillWithValue(data.pendingblogs);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all active blogs
export const getActiveBlogs = createAsyncThunk(
  "admin/getActiveBlogs",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/admin/active-blogs`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activeblogs);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete pending blog
export const deletePendingBlog = createAsyncThunk(
  "admin/deletePendingBlog",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/admin/delete-pending-blog/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete active blog
export const deleteActiveBlog = createAsyncThunk(
  "admin/deleteActiveBlog",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/admin/delete-active-blog/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// update pending blog
export const updatePendingBlog = createAsyncThunk(
  "admin/updatePendingBlog",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseurl}/admin/update-blog/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// logout
export const logout = createAsyncThunk(
  "admin/logout",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}/user/logout`, {
        withCredentials: true,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const adminReducer = createSlice({
  name: "adminReducer",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.loading = false;
      state.users = [];
      state.totalUsers = 0;
      state.totalProducts = 0;
      state.totalPartners = 0;
      state.totalServices = 0;
      state.newsletter = [];
      state.pendingservices = [];
      state.activeservices = [];
      state.isPendingServiceDeleted = false;
      state.isPendingServiceUpdated = false;
      state.isActiveserviceDeleted = false;
      state.pendingevents = [];
      state.activeevents = [];
      state.isPendingEventDeleted = false;
      state.isPendingEventUpdated = false;
      state.isActiveEventDeleted = false;
      state.isEventPosted = false;
      state.pendingpartners = [];
      state.activepartners = [];
      state.isPendingPartnerDeleted = false;
      state.isPendingPartnerUpdated = false;
      state.isActivePartnerDeleted = false;
      state.activeproducts = [];
      state.pendingproducts = [];
      state.isPendingProductDeleted = false;
      state.isPendingProductUpdated = false;
      state.isActiveProductDeleted = false;
      state.isNewsletterDeleted = false;
      state.isBlogPosted = false;
      state.pendingblogs = [];
      state.activeblogs = [];
      state.isPendingBlogDeleted = false;
      state.isActiveBlogDeleted = false;
      state.isPendingBlogUpdated = false;
      state.isLoggedOut = false;
    },
  },
  extraReducers: (builder) => {
    // getUsers
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getTotalProducts
    builder.addCase(getTotalProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTotalProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.totalProducts = action.payload;
    });
    builder.addCase(getTotalProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getTotalPartners
    builder.addCase(getTotalPartners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTotalPartners.fulfilled, (state, action) => {
      state.loading = false;
      state.totalPartners = action.payload;
    });
    builder.addCase(getTotalPartners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getTotalServices
    builder.addCase(getTotalServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTotalServices.fulfilled, (state, action) => {
      state.loading = false;
      state.totalServices = action.payload;
    });
    builder.addCase(getTotalServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getNewsletters
    builder.addCase(getNewsletters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNewsletters.fulfilled, (state, action) => {
      state.loading = false;
      state.newsletter = action.payload;
    });
    builder.addCase(getNewsletters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getPendingServices
    builder.addCase(getPendingServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingServices.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingservices = action.payload;
    });
    builder.addCase(getPendingServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getActiveServices
    builder.addCase(getActiveServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActiveServices.fulfilled, (state, action) => {
      state.loading = false;
      state.activeservices = action.payload;
    });
    builder.addCase(getActiveServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deletePendingService
    builder.addCase(deletePendingService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePendingService.fulfilled, (state) => {
      state.loading = false;
      state.isPendingServiceDeleted = true;
    });
    builder.addCase(deletePendingService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // updatePendingService
    builder.addCase(updatePendingService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePendingService.fulfilled, (state) => {
      state.loading = false;
      state.isPendingServiceUpdated = true;
    });
    builder.addCase(updatePendingService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deleteActiveService
    builder.addCase(deleteActiveService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActiveService.fulfilled, (state) => {
      state.loading = false;
      state.isActiveserviceDeleted = true;
    });
    builder.addCase(deleteActiveService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getPendingEvents
    builder.addCase(getPendingEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingevents = action.payload;
    });
    builder.addCase(getPendingEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // updatePendingEvent
    builder.addCase(updatePendingEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePendingEvent.fulfilled, (state) => {
      state.loading = false;
      state.isPendingEventUpdated = true;
    });
    builder.addCase(updatePendingEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deletePendingEvent
    builder.addCase(deletePendingEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePendingEvent.fulfilled, (state) => {
      state.loading = false;
      state.isPendingEventDeleted = true;
    });
    builder.addCase(deletePendingEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getActiveEvents
    builder.addCase(getActiveEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActiveEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.activeevents = action.payload;
    });
    builder.addCase(getActiveEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deleteActiveEvent
    builder.addCase(deleteActiveEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActiveEvent.fulfilled, (state) => {
      state.loading = false;
      state.isActiveEventDeleted = true;
    });
    builder.addCase(deleteActiveEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // postEvent
    builder.addCase(postEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postEvent.fulfilled, (state) => {
      state.loading = false;
      state.isEventPosted = true;
    });
    builder.addCase(postEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getPendingPartners
    builder.addCase(getPendingPartners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingPartners.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingpartners = action.payload;
    });
    builder.addCase(getPendingPartners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getActivePartners
    builder.addCase(getActivePartners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActivePartners.fulfilled, (state, action) => {
      state.loading = false;
      state.activepartners = action.payload;
    });
    builder.addCase(getActivePartners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // udatePendingPartner
    builder.addCase(updatePendingPartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePendingPartner.fulfilled, (state) => {
      state.loading = false;
      state.isPendingPartnerUpdated = true;
    }
    );
    builder.addCase(updatePendingPartner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deletePendingPartner
    builder.addCase(deletePendingPartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePendingPartner.fulfilled, (state) => {
      state.loading = false;
      state.isPendingPartnerDeleted = true;
    });
    builder.addCase(deletePendingPartner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deleteActivePartner
    builder.addCase(deleteActivePartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActivePartner.fulfilled, (state) => {
      state.loading = false;
      state.isActivePartnerDeleted = true;
    });
    builder.addCase(deleteActivePartner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get pending products
    builder.addCase(getPendingProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingproducts = action.payload;
    });
    builder.addCase(getPendingProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // update pending product
    builder.addCase(updatePendingProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePendingProduct.fulfilled, (state) => {
      state.loading = false;
      state.isPendingProductUpdated = true;
    });
    builder.addCase(updatePendingProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get active products
    builder.addCase(getActiveProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActiveProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.activeproducts = action.payload;
    });
    builder.addCase(getActiveProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // delete pending product
    builder.addCase(deletePendingProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePendingProduct.fulfilled, (state) => {
      state.loading = false;
      state.isPendingProductDeleted = true;
    });
    builder.addCase(deletePendingProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // delete active product
    builder.addCase(deleteActiveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActiveProduct.fulfilled, (state) => {
      state.loading = false;
      state.isActiveProductDeleted = true;
    });
    builder.addCase(deleteActiveProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deleteNewsletter
    builder.addCase(deleteNewsletter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNewsletter.fulfilled, (state) => {
      state.loading = false;
      state.isNewsletterDeleted = true;
    });
    builder.addCase(deleteNewsletter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // postBlog
    builder.addCase(postBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postBlog.fulfilled, (state) => {
      state.loading = false;
      state.isBlogPosted = true;
    });
    builder.addCase(postBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getPendingBlogs
    builder.addCase(getPendingBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingblogs = action.payload;
    });
    builder.addCase(getPendingBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // getActiveBlogs
    builder.addCase(getActiveBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActiveBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.activeblogs = action.payload;
    });
    builder.addCase(getActiveBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deletePendingBlog
    builder.addCase(deletePendingBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePendingBlog.fulfilled, (state) => {
      state.loading = false;
      state.isPendingBlogDeleted = true;
    });
    builder.addCase(deletePendingBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // deleteActiveBlog
    builder.addCase(deleteActiveBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActiveBlog.fulfilled, (state) => {
      state.loading = false;
      state.isActiveBlogDeleted = true;
    });
    builder.addCase(deleteActiveBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // updatePendingBlog
    builder.addCase(updatePendingBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePendingBlog.fulfilled, (state) => {
      state.loading = false;
      state.isPendingBlogUpdated = true;
    });
    builder.addCase(updatePendingBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedOut = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

  },
});

export default adminReducer.reducer;
export const { clearState } = adminReducer.actions;
