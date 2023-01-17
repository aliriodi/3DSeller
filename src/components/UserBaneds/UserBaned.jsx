import React from "react";
import Link from "next/link";

export default function UserBaned() {
  return (
    <div className="permissions-denied">
      <div className="permissions-denied-text">
        <h1> Parece que ha ocurrido algo </h1>
        <p>
          Al parecer su usuario fue bloqueado debido a algún incumplimiento con
          nuestras <b> Normas de convivencia </b> Si lo desea puede ponerse en
          contacto con
          <Link href={"/contacto"}>
            <b> nuestro equipo de soporte </b>
          </Link>
          para intentar solucionar la situación.
        </p>
      </div>
    </div>
  );
}
