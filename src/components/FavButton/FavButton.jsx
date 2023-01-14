import React, { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritos, chngFavoritos } from "../../redux/DSellerActions";

export default function FavButton(props) {
  const dispatch = useDispatch();

  const { favorites } = useSelector((state) => state.products);

  //Una vez cargado el arreglo favoritos con la informacion del local Storage este Effect (que es el mismo que controla y envia los cambios a la DB) envia los nuevos datos a la DB
  useEffect(() => {
    const resultado = favorites.find((r) => r.id === props.id);
    if (resultado) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [favorites]);

  //#region Manejadores de los botones "Fav"
  const [active, setActive] = useState(false);

  const agregarFAv = () => {
    dispatch(setFavoritos(props));
  };

  const quitarFav = () => {
    const filtrados = favorites.filter((e) => e.name !== props.name);
    dispatch(chngFavoritos(filtrados));
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
