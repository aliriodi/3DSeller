import React from "react";
import FavButton from "../FavButton/FavButton";
import { useSelector } from "react-redux";

export default function Vcard(props) {
  const { user } = useSelector((state) => state.products);
  return (
    <div>
      <div className="card" key={props.id}>
        {user.given_name || user.nickname ? (
          <FavButton
            id={props.id}
            key={props.id}
            image={props.image}
            name={props.name}
            rating={props.rating}
            category={props.category}
          />
        ) : null}
        <a href={`/productos/${props.id}`}>
          <img src={!props.image ? null : props.image} />
          <div className="card_text">
            <h3>{props.name}</h3>
            <b>Rating: {props.rating}</b>
            <b>Categoria: {props.category}</b>
          </div>
        </a>
      </div>
    </div>
  );
}
