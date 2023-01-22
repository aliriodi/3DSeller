import React from "react";
import FavButton from "../FavButton/FavButton";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export default function Vcard(props) {
  const { user } = useSelector((state) => state.products);

  //console.log("user", user.rol);
  return (
    <div>
      <div className="card" key={props.id}>
        {user.rol === "invitado" || user.rol === "banned" ? null : (
          <FavButton
            id={props.id}
            key={props.id}
            image={props.image}
            name={props.name}
            rating={props.rating}
            category={props.category}
          />
        )}
        <Link href={`/productos/${props.id}`} legacyBehavior>
          <a>
            <img src={!props.image ? null : props.image} />
            <div className="card_text">
              <h3>{props.name}</h3>
              <b>Rating: {props.rating}</b>
              <b>Categoria: {props.category}</b>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
