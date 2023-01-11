import Products from "components/Products/Products";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoritos, changeFavs } from "../../redux/DSellerActions";

export default function FavButton(props) {
  const dispatch = useDispatch();
  const { favoritos } = useSelector((state) => state.products);
  console.log("soy los fav", favoritos);
  let [selected, setSelected] = useState(false);

  //#region Handler button
  const handleSelect = () => {
    console.log("props_button", [props]);
    dispatch(addFavoritos([props]));
    setSelected(true);
  };
  // Cuando el boton ya fue seleccionado
  const handleUnselect = () => {
    const quitar = favoritos.filter((e) => e.name !== props.name);
    dispatch(changeFavs(quitar));
    console.log("soy quitar", quitar);
    setSelected(false);
  };
  //#endregion
  //#region apariencia del boton onclick

  //#endregion

  return selected === false ? (
    <div>
      <button onClick={handleSelect}> ♥ </button>
    </div>
  ) : (
    <button onClick={handleUnselect}> OOOOOOOOOOOOOOOOOOOOOO </button>
  );
}
