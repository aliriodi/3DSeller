import React from "react";
import Link from "next/link";

export default function NoFavsYet() {
  return (
    <div>
      <h1>Lo sentimos</h1>

      <p>
        parece que aún no tiene productos favoritos, visite nuestra pagina
        <Link href={"/productos"}>
          <b> productos </b>
        </Link>
        para añadir algunos diseños a su lista de favoritos
      </p>
    </div>
  );
}
