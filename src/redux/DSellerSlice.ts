import { createSlice } from "@reduxjs/toolkit";
import { ObjectType } from "typescript";

import type { PayloadAction } from '@reduxjs/toolkit'

export interface DSellerStateProducts {
  products: Array<ObjectType>;
  productsR: Array<ObjectType>;
  count: number;
  detail: object;
  newProduct: object;
  cFO: number;
  filtersAord: Array<ObjectType>;
  searchS: Array<ObjectType>;
  user: object;
  favorites: Array<ObjectType>;
  userL:object;
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
  favorites: [],
  userL:{name:'Invitado', rol:'invitado', email:'invitado'}

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
      state.userL = action.payload;
      state.user = action.payload;
    },

    getUserBDLS:(state,action)=>{
      state.userL = action.payload;
     
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

    postCreateUserS: (state, action) => {
      state.userL = action.payload
    },

    postCreateProductS: (state, action) => {
      state.newProduct = action.payload;
    },

    addFavoritos: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },

    replaceFavoritos: (state, action) => {
      state.favorites = action.payload;
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
  getUserBDLS,
  postCreateUserS
} = DSellerSlice.actions;

export default DSellerSlice.reducer;
