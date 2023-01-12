import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritos, chngFavoritos } from "../../redux/DSellerActions";

export default function FavButton(props) {
  const { favoritos } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  //console.log("favoritos", favoritos);

  //#region Manejadores de los botones "Fav"
  const agregarFAv = () => {
    dispatch(setFavoritos(props));
    setActive(true);
  };

  const quitarFav = () => {
    const filtrados = favoritos.filter((e) => e.name !== props.name);
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
