import { createSlice} from "@reduxjs/toolkit";
//import type { PayloadAction } from '@reduxjs/toolkit'

export interface DSellerStateProducts {
  products:object,
  productsR:object,
  count:number,
  detail:object,
  newProduct: object,
  cFO:number,
  filtersAord:object,
}

const initialState: DSellerStateProducts = {
  products:[],
  productsR:[],
  count:0,
  detail:{},
  newProduct: {},
  cFO:0,
  filtersAord:[]
}
export const DSellerSlice = createSlice ({
         name: "products",
         initialState,
  reducers:{ 

    getRenderS: (state,action)=> {
      state.products = action.payload,
      state.count = action.payload.length
    },  

    getAllProducts: (state,action)=>{
        state.products = action.payload,
        state.count = action.payload.length
    },

    getProductById: (state,action)=>{
        state.detail = action.payload,
        state.count = action.payload._id? 1:0;
    },

    postCreateProductS:(state,action)=>{
        state.newProduct = action.payload
    }
  }
})
 
export const {getAllProducts , getProductById , postCreateProductS, getRenderS} = DSellerSlice.actions;

export default DSellerSlice.reducer 
