import { createSlice } from "@reduxjs/toolkit";
import { ObjectType } from "typescript";

//import type { PayloadAction } from '@reduxjs/toolkit'

export interface DSellerStateProducts {
  products: object;
  productsR: object;
  count: number;
  detail: object;
  newProduct: object;
  cFO: number;
  filtersAord: object;
  searchS: object;
  user: object;
  favoritos: Array<ObjectType>;
}

const initialState: DSellerStateProducts = {
  products: [],
  productsR: [],
  searchS: [],
  count: 0,
  detail: {},
  newProduct: {},
  cFO: 0,
  filtersAord: [],
  user: {},
  favoritos: [],
};
export const DSellerSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetRqstS: (state, action) => {
      (state.cFO = action.payload[0]), (state.filtersAord = action.payload[1]);
      state.searchS = [];
    },

    getUserS: (state, action) => {
      state.user = action.payload;
    },

    getRenderS: (state, action) => {
      state.productsR = action.payload;
    },

    getAllProducts: (state, action) => {
      (state.products = action.payload), (state.count = action.payload.length);
    },

    getProductById: (state, action) => {
      (state.detail = action.payload),
        (state.count = action.payload._id ? 1 : 0);
    },

    postCreateProductS: (state, action) => {
      state.newProduct = action.payload;
    },

    addFavoritos: (state, action) => {
      state.favoritos = [...state.favoritos, action.payload];
    },

    replaceFavoritos: (state, action) => {
      state.favoritos = action.payload;
    },
  },
});

export const {
  addFavoritos,
  replaceFavoritos,
  getAllProducts,
  getProductById,
  postCreateProductS,
  getRenderS,
  resetRqstS,
  getUserS,
} = DSellerSlice.actions;

export default DSellerSlice.reducer;
