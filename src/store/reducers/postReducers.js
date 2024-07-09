import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../baseUrl";

const initialState = {
  loading: false,
  error: "",
  isProductPosted: false,
  pendingproducts: [],
  isProductDeleted: false,
  activeproducts: [],
  activeproducts: [],
  services: [],
  isServicePosted: false,
  isServiceDeleted: false,
  isActiveServiceDeleted: false,
  pendingservices: [],
  activeservices: [],
  isActiveProductDeleted: false,
  isBlogPosted: false,
  pendingblogs: [],
  activeblogs: [],
  isPendingBlogDeleted: false,
  isActiveBlogDeleted: false,
  blogs: [],
  blogdetails:[],
};

// post a product
export const postProduct = createAsyncThunk(
  "postReducer/postProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/post-product`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//   get all pending products
export const getPendingProducts = createAsyncThunk(
  "postReducer/getPendingProducts",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/get-products`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.pendingproducts);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a product
export const deleteProduct = createAsyncThunk(
  "postReducer/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-product/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete active product
export const deleteActiveProduct = createAsyncThunk(
  "postReducer/deleteActiveProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-active-product/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get active products of a user
export const getActiveProducts = createAsyncThunk(
  "postReducer/getActiveProducts",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/active-products`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activeproducts);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all products
export const getProducts = createAsyncThunk(
  "postReducer/getProducts",
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

// get all  services
export const getServices = createAsyncThunk(
  "postReducer/getServices",
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

// post a service
export const postService = createAsyncThunk(
  "postReducer/postService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/post-service`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all pending services
export const getPendingServices = createAsyncThunk(
  "postReducer/getPendingServices",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/get-services`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data.pendingservices);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a service
export const deleteService = createAsyncThunk(
  "postReducer/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-service/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete  active service
export const deleteActiveService = createAsyncThunk(
  "postReducer/deleteActiveService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-active-service/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  get active services of a user
export const getActiveServices = createAsyncThunk(
  "postReducer/getActiveServices",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/active-services`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.services);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// post a pending blog
export const postBlog = createAsyncThunk(
  "postReducer/postBlog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/user/post-blog`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all pending blogs
export const getPendingBlogs = createAsyncThunk(
  "postReducer/getPendingBlogs",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/get-blogs`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data.pendingblogs);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a pending blog
export const deletePendingBlog = createAsyncThunk(
  "postReducer/deletePendingBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-blog/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete an active blog
export const deleteActiveBlog = createAsyncThunk(
  "postReducer/deleteActiveBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}/user/delete-active-blog/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all active blogs of user
export const getActiveBlogs = createAsyncThunk(
  "postReducer/getActiveBlogs",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/active-blogs`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.activeblogs);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all blogs
export const getAllBlogs = createAsyncThunk(
  "postReducer/getAllBlogs",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/user/all-active-blogs`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.blogs);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get blog by id
export const getBlogById = createAsyncThunk(
  "postReducer/getBlogById",
  async (id, {fulfillWithValue, rejectWithValue }) => {
    try {
      const {data} = await axios.get(`${baseurl}/user/blog/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.blogdetails);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const postReducer = createSlice({
  name: "postReducer",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.isProductPosted = false;
      state.pendingproducts = [];
      state.isProductDeleted = false;
      state.activeproducts = [];
      state.activeproducts = [];
      state.services = [];
      state.isServicePosted = false;
      state.isServiceDeleted = false;
      state.pendingservices = [];
      state.activeservices = [];
      state.isActiveServiceDeleted = false;
      state.isActiveProductDeleted = false;
      state.isBlogPosted = false;
      state.pendingblogs = [];
      state.activeblogs = [];
      state.isPendingBlogDeleted = false;
      state.isActiveBlogDeleted = false;
      state.blogs = [];
      state.blogdetails = [];
    },
  },
  extraReducers: (builder) => {
    // post a product
    builder.addCase(postProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isProductPosted = true;
    });
    builder.addCase(postProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get all pending products
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
    // delete a product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
      state.isProductDeleted = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get active products of a user
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
    // get all products
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.activeproducts = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get all services
    builder.addCase(getServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.loading = false;
      state.activeservices = action.payload;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // post a service
    builder.addCase(postService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postService.fulfilled, (state, action) => {
      state.loading = false;
      state.isServicePosted = true;
    });
    builder.addCase(postService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get all pending services
    builder.addCase(getPendingServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingServices.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingservices = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getPendingServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // delete a service
    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteService.fulfilled, (state) => {
      state.loading = false;
      state.isServiceDeleted = true;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // get active services of a user
    builder.addCase(getActiveServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActiveServices.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
    });
    builder.addCase(getActiveServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // delete active service
    builder.addCase(deleteActiveService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActiveService.fulfilled, (state) => {
      state.loading = false;
      state.isActiveServiceDeleted = true;
    });
    builder.addCase(deleteActiveService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
      state.error = action.payload;
    });
    // post a blog
    builder.addCase(postBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postBlog.fulfilled, (state) => {
      state.loading = false;
      state.isBlogPosted = true;
    });
    builder.addCase(postBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get all pending blogs
    builder.addCase(getPendingBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingblogs = action.payload;
    });
    builder.addCase(getPendingBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // delete a pending blog
    builder.addCase(deletePendingBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePendingBlog.fulfilled, (state) => {
      state.loading = false;
      state.isPendingBlogDeleted = true;
    });
    builder.addCase(deletePendingBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // delete an active blog
    builder.addCase(deleteActiveBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActiveBlog.fulfilled, (state) => {
      state.loading = false;
      state.isActiveBlogDeleted = true;
    });
    builder.addCase(deleteActiveBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get all active blogs
    builder.addCase(getActiveBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActiveBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.activeblogs = action.payload;
    });
    builder.addCase(getActiveBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get all blogs
    builder.addCase(getAllBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    });
    builder.addCase(getAllBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get blog by id
    builder.addCase(getBlogById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogById.fulfilled, (state, action) => {
      state.loading = false;
      state.blogdetails = action.payload;
    });
    builder.addCase(getBlogById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },
});

export default postReducer.reducer;
export const { clearState } = postReducer.actions;
