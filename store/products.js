import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], loading: true, filteredList: [] },
  reducers: {
    productsRecieved: (products, action) => {
      products.list = action.payload;
      products.filteredList = action.payload;
      products.loading = false;
    },
    productRemoved: (products, action) => {
      products.list = products.filteredList = products.list.filter((p) => p.photoURL !== action.payload.photoURL);
    },
    addProduct: (products, action) => {
      products.list.unshift(action.payload);
      products.filteredList = products.list;
    },
    filterProducts: (products, action) => {
      products.filteredList = products.list.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { productsRecieved, productRemoved, addProduct, filterProducts } = productsSlice.actions;

export default productsSlice.reducer;
