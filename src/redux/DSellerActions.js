import {
  getAllProducts,
  getProductById,
  postCreateProductS,
  getRenderS,
  resetRqstS,
  getUserS,
  addFavoritos,
  replaceFavoritos,
} from "./DSellerSlice";

export const setFavoritos = (props) => (dispatch) => {
  dispatch(addFavoritos(props));
};

export const chngFavoritos = (props) => (dispatch) => {
  dispatch(replaceFavoritos(props));
};

export const PutFavorite = async (sendDb) => {
  console.log(sendDb);
  console.log({
    favorites: sendDb.favorites,
    email: "aliriodi@gmail.com",
    name: "Alirio Diaz",
  });

  await fetch("/api/user/" + sendDb.user.email, {
    //await fetch("https://3dseller.vercel.app/api/user/"+email, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorites: sendDb.favorites,
      email: "aliriodi@gmail.com",
      name: "Alirio Diaz",
    }),
  })
    .then((response) => response.json())
    //  .then((myJson) => dispatch(replaceFavoritos(myJson)))
    .catch((error) => console.log(error));
};

export const getRender = (state) => async (dispatch) => {
  dispatch(getRenderS(state));
};

export const resetState = (cFO, filtersAord) => async (dispatch) => {
  dispatch(resetRqstS([cFO, filtersAord]));
};

export const getUser = () => async (dispatch) => {
  await fetch("/api/auth/me", {
    mode: "cors",
    headers: { "Access-Control-Allow-Origin": "*" },
  })
    // await fetch("https://3dseller.vercel.app/api/auth/me", {
    //   mode: "cors",
    //   headers: { "Access-Control-Allow-Origin": "*" },
    // })
    .then((response) => response.json())
    .then((myJson) => dispatch(getUserS(myJson)))
    .catch((error) => console.log(error));
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
