import {
  addFavorito,
  getAllProducts,
  getProductById,
  postCreateProductS,
  getRenderS,
  resetRqstS,
  sustituirFavorito,
} from "./DSellerSlice";

export const addFavoritos = (fav) => (dispatch) => {
  dispatch(addFavorito(fav));
};

export const changeFavs = (fav) => (dispatch) => {
  dispatch(sustituirFavorito(fav));
};

export const getRender = (state) => async (dispatch) => {
  dispatch(getRenderS(state));
};

export const resetState = (cFO, filtersAord) => async (dispatch) => {
  dispatch(resetRqstS([cFO, filtersAord]));
};

export const getProducts = () => async (dispatch) => {
  // await  fetch('http://localhost:3000/api/products')
  await fetch("https://3dseller.vercel.app/api/products")
    .then((response) => response.json())
    .then((myJson) => dispatch(getAllProducts(myJson)))
    .catch((error) => console.log(error));
};

export const getProductDet = (id) => async (dispatch) => {
  // await  fetch('http://localhost:3000/api/products/'+id)
  await fetch("https://3dseller.vercel.app/api/products/" + id)
    .then((response) => response.json())
    .then((myJson) => dispatch(getProductById(myJson)))
    .catch((error) => console.log(error));
};

export const postCreateProduct = (product) => async (dispatch) => {
  // await  fetch('http://localhost:3000/api/products',
  await fetch("https://3dseller.vercel.app/api/products/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((myJson) => dispatch(postCreateProductS(myJson)))
    .catch((error) => console.log(error));
};
