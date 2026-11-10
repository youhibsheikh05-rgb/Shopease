import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchProducts = createAsyncThunk("products/fetch", async (params = {}) => {
  const { q = "", category = "", limit = 12, skip = 0 } = params;
  let url = "/products";
  if (q) url = `/products/search?q=${q}`;
  else if (category) url = `/products/category/${category}`;
  const res = await api.get(url, { params: { limit, skip } });
  return res.data;
});

export const fetchCategories = createAsyncThunk("products/categories", async () => {
  const res = await api.get("/products/category-list");
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], total: 0, categories: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.loading = true; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.list = a.payload.products; s.total = a.payload.total; })
      .addCase(fetchProducts.rejected, (s) => { s.loading = false; })
      .addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload; });
  },
});

export default productSlice.reducer;
