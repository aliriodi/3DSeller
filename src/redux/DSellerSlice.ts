import { createSlice } from "@reduxjs/toolkit";
import StateManagedSelect from "react-select/dist/declarations/src/stateManager";
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
  favoritos: object;
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

    addFavorito: (state, action) => {
      state.favoritos = state.favoritos.concat(action.payload);
    },

    sustituirFavorito: (state, action) => {
      state.favoritos = action.payload;
    },
  },
});

export const {
  getAllProducts,
  getProductById,
  postCreateProductS,
  getRenderS,
  resetRqstS,
  addFavorito,
  sustituirFavorito,
} = DSellerSlice.actions;

export default DSellerSlice.reducer;
