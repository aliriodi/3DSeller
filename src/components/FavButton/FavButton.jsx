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

  const { favorites } = useSelector((state) => state.products);

  //#region Manejadores de los botones "Fav"
  const [active, setActive] = useState(false);

  useEffect(() => {
    const resultado = favorites.find((r) => r.id === props.id);
    console.log(favorites)
    if (resultado) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [favorites]);

  const agregarFAv = () => {
    dispatch(setFavoritos(props));
  };

  const quitarFav = () => {
    const filtrados = favorites.filter((e) => e.name !== props.name);
    dispatch(chngFavoritos(filtrados));
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
