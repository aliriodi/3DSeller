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
  searchS:object,
  user:object
}

const initialState: DSellerStateProducts = {
  products:[],
  productsR:[],
  searchS:[],
  count:0,
  detail:{},
  newProduct: {},
  cFO:0,
  filtersAord:[],
  user:{}
}
export const DSellerSlice = createSlice ({
         name: "products",
         initialState,
  reducers:{ 
    resetRqstS: (state,action) => {
      state.cFO         = action.payload[0],
      state.filtersAord = action.payload[1]
      state.searchS = []
    },

    getUserS: (state,action)=> {
      state.user = action.payload
      
    }, 

    getRenderS: (state,action)=> {
      state.productsR = action.payload
      
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
 
export const {getAllProducts , getProductById , postCreateProductS, getRenderS, resetRqstS, getUserS } = DSellerSlice.actions;

export default DSellerSlice.reducer 
