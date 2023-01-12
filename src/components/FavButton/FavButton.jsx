import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritos } from "../../redux/DSellerActions";

export default function FavButton(props) {
  const { favoritos } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  console.log("favoritos", favoritos);

  const agregarFAv = () => {
    dispatch(setFavoritos([props]));
    setActive(true);
  };

  const quitarFav = () => {
    const filtrado = favoritos.filter((e) => e.name !== props.name);
    dispatch(setFavoritos(filtrado));
    setActive(false);
  };

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
