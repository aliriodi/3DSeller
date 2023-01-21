import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NoFavsYet() {
  const { user } = useSelector((state) => state.products);

  return user.rol === "invitado" ? (
    <div>
      <h1>Lo sentimos</h1>
      <br></br>
      <div>
        Parece que aún no se encuentra registrado, para poder añadir productos
        como favoritos por favor
        <Link href={"/api/auth/login"}>
          <b>
            <h3> registrese en nuestra sitio. </h3>
          </b>
        </Link>
      </div>
    </div>
  ) : (
    <div>
      <h1>Lo sentimos</h1>
      <br></br>
      <div>
        parece que aún no tiene productos favoritos, visite nuestra pagina
        <Link href={"/productos"}>
          <b>
            <h3> productos </h3>
          </b>
        </Link>
        para añadir algunos diseños a su lista de favoritos.
      </div>
    </div>
  );
}
