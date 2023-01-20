import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chngFavoritos } from "redux/DSellerActions";
import Vcard from "../Vcard/Vcard";
import NoFavsYet from "../FavButton/NoFavsYet";
import UserBaned from "components/UserBaneds/UserBaned";

export default function Favoritos() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.products);
  const { favorites } = useSelector((state) => state.products);

  useEffect(() => {
    //la siguiente linea busca informacion del Local Storage y si la encuentra carga el arreglo favoritos con ella
    const storedFavorites = localStorage.getItem("favorites");
    if (user.rol === "admin" || user.rol === "client") {
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        dispatch(chngFavoritos(favorites));
      }
    }
  }, []);

  return user.rol === "banned" ? (
    <UserBaned />
  ) : (
    <div className="products-container">
      <div>
        <div className="container-cards">
          {favorites.length > 0 ? (
            favorites.map((product3d) => {
              return (
                <Vcard
                  className="productoclass"
                  key={product3d.id}
                  id={product3d.id}
                  name={product3d.name}
                  image={product3d.image}
                  category={product3d.category}
                  rating={product3d.rating}
                />
              );
            })
          ) : (
            <div>
              <NoFavsYet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
