import {
  getAllProducts,
  getProductById,
  postCreateProductS,
  getRenderS,
  resetRqstS,
  getUserS,
  getAllUserS,
  addFavoritos,
  replaceFavoritos,
  getUserBDLS,
  postCreateUserS,
  modificarUserS,
  PUT_PRODUCT,
  getcomprasS,
  cleanDeatils,
} from "./DSellerSlice";

export const Limpiar = (props) => (dispatch) => {
  dispatch(cleanDeatils(props));
};

export const getcompras = () => async (dispatch) => {
  await fetch("/api/purchases")
    .then((response) => response.json())
    .then((json) => dispatch(getcomprasS(json)))
    .catch((error) => console.log(error));
};

export const getLOGOUT = () => async (dispatch) => {
  await fetch("/api/user")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
};

export const setFavoritos = (props) => (dispatch) => {
  dispatch(addFavoritos(props));
};

export const chngFavoritos = (props) => (dispatch) => {
  dispatch(replaceFavoritos(props));
};

export const PutFavorite = (sendDb) => async () => {
  await fetch("/api/user/" + sendDb.user.email, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      favorites: sendDb.favorites,
      name: sendDb.user.name,
      rol: sendDb.user.rol,
      picture: sendDb.user.picture,
      email: sendDb.user.email,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const GetUserBDL = (email) => async (dispatch) => {
  await fetch("/api/user/" + email)
    .then((response) => response.json())
    .then((json) => dispatch(getUserBDLS(json)))
    .catch((error) => console.log(error));
};

export const getRender = (state) => async (dispatch) => {
  dispatch(getRenderS(state));
};

export const resetState = (cFO, filtersAord) => async (dispatch) => {
  dispatch(resetRqstS([cFO, filtersAord]));
};

export const getUser = (username) => async (dispatch) => {
  if (username === "invitado") {
    dispatch(
      getUserS({ name: "Invitado", email: "invitado", rol: "invitado" })
    );
  } else {
    await fetch("/api/auth/me", {
      mode: "cors",
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          //usuario no logeado
          dispatch(
            getUserS({ name: "Invitado", email: "invitado", rol: "invitado" })
          );
        }
        if (response.status === 200) {
          //usuario logueado en auth0
          console.log("status 200");
          console.log(response);
          fetch("/api/auth/me", {
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*" },
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              //aca lo mando contra la BDL y sus propiedades
              let user2 = json;
              fetch("/api/user/" + json.email)
                .then((response) => response.json())
                .then((user) => {
                  // console.log('Uno') ;console.log(user);
                  // console.log('Dos') ;console.log(user2);
                  if (user) {
                    let temp = [];
                    const Rol = user.rol;
                    Rol === "admin"
                      ? dispatch(getcompras())
                      : Rol === "client"
                      ? fetch("/api/purchases")
                          .then((response) => response.json())
                          .then((json) => {
                            console.log(user);
                            console.log(json);
                            json.map((order) =>
                              order.user.id === user._id
                                ? temp.push({
                                    idorder: order.order_id,
                                    product: order.product,
                                    purchase: order.purchase,
                                  })
                                : null
                            );
                            return temp;
                          })
                          .then((temp) => {
                            console.log("now");
                            console.log(user);
                            dispatch(getcomprasS(temp));
                          })
                      : null;
                    dispatch(getUserS(user));
                  } else {
                    const magik = Math.floor(Math.random() * 10000);
                    console.log("magik es = " + magik);
                    user2.validate2 = false;
                    user2.magiknumber = magik;
                    user2.rol = "invitado";
                    dispatch(postCreateUser(user2));
                    //handleSentMail(magik,user2.email)
                    fetch("/api/mail/mail/", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(user2),
                    }).then((response) =>
                      // setTimeout(() => {
                      //   alert('correo enviado '+response)
                      // }, 500)
                      alert("Se ha enviado un correo de Validacion")
                    );
                  }
                });
            });
        }
      })
      .catch((error) => console.log(error));
  }
};

export const getAllUser = () => async (dispatch) => {
  await fetch("/api/user")
    .then((response) => response.json())
    .then((json) => dispatch(getAllUserS(json)))
    .catch((error) => console.log(error));
};

export const getProducts = () => async (dispatch) => {
  await fetch("/api/products")
    .then((response) => response.json())
    .then((myJson) => dispatch(getAllProducts(myJson)))
    .catch((error) => console.log(error));
};

export const getProductDet = (id) => async (dispatch) => {
  await fetch("/api/products/" + id)
    .then((response) => response.json())
    .then((myJson) => dispatch(getProductById(myJson)))
    .catch((error) => console.log(error));
};

export const postCreateProduct = (product) => async (dispatch) => {
  console.log(product);
  await fetch("/api/products/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((myJson) => {
      dispatch(postCreateProductS(myJson));
    })
    .catch((error) => console.log(error));
};

export const modificarUser = (user) => async (dispatch) => {
  await fetch("/api/user/" + user.email, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((myJson) => dispatch(modificarUserS(myJson)))
    .catch((error) => console.log(error));
};
export const postCreateUser = (user) => async (dispatch) => {
  await fetch("/api/user/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((myJson) => dispatch(postCreateUserS(myJson)))
    .catch((error) => console.log(error));
};
export const putProduct = (props) => async (dispatch) => {
  await fetch("/api/products/" + props._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  })
    .then((response) => response.json())
    .then((myJson) => dispatch(PUT_PRODUCT(myJson)))
    .catch((error) => console.log(error));
};
