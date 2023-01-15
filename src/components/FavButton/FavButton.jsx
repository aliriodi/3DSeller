import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoritos,
  chngFavoritos,
  PutFavorite,
  } from "../../redux/DSellerActions";
import Image from "next/image";
import iconOff from "../../public/fav-icon_off.png"
import iconOn from "../../public/fav-icon_on.png"

export default function FavButton(props) {
 
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUser());
  //   // eslint-disable-next-line
  // }, [dispatch]);
 
  const { favorites } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.products);
  const [active, setActive] = useState(false);
  //console.log("favoritos", favoritos);

  const sendDB = { favorites: favorites, user: user };

  useEffect(() => {
    dispatch(PutFavorite(sendDB));
    // eslint-disable-next-line
    console.log("sendDB", sendDB.favorites);
  }, [favorites]);

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
    <div className="fav-icon-container">
      <span className="fav-icon_off" onClick={agregarFAv}>
        <Image alt="fav-icon_off" src={iconOff}/>
      </span>
    </div>
  ) : (
    <div className="fav-icon-container">
      <span className="fav-icon_on"onClick={quitarFav}>
        <Image alt="fav-icon_on" src={iconOn}/>
        </span>
    </div>
  );
}
