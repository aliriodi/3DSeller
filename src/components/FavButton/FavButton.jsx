import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoritos,
  chngFavoritos,
  PutFavorite,
  getUser,
} from "../../redux/DSellerActions";

export default function FavButton(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line
  }, [dispatch]);
  const { favorites } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.products);
  const [active, setActive] = useState(false);
  //console.log("favoritos", favoritos);

  const sendDB = { favorites: favorites, user: user };

  useEffect(() => {
    dispatch(PutFavorite(sendDB));
    // eslint-disable-next-line
    console.log("sendDB", sendDB.favorites);
  }, [user,favorites]);

  //#region Manejadores de los botones "Fav"
  const agregarFAv = () => {
    dispatch(setFavoritos(props));

    setActive(true);
  };

  const quitarFav = () => {
    const filtrados = favorites.filter((e) => e.name !== props.name);
    dispatch(chngFavoritos(filtrados));
    setActive(false);
  };
  //#endregion
  return active === false ? (
    <div>
      <button onClick={agregarFAv}> ♥ </button>
    </div>
  ) : (
    <div>
      <button onClick={quitarFav}> | | | | | | | | | | |</button>
    </div>
  );
}
