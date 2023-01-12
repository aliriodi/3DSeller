import React, { useEffect } from "react";
import FavButton from "../FavButton/FavButton";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/DSellerActions";
import imghc from "../../public/model3d.png";

export default function Vcard(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line
  }, [dispatch]);
  const { user } = useSelector((state) => state.products);
  return (
    /// Anterior version de la Card ///
    //
    // <div className="card">
    //    <h4 className="cardTitle">{props.name}</h4>
    //    {props.image?<a href={`/productos/${props.id}`}>
    //   <img  className={props.name==="Alberto Presto Pronta"||props.name==="La Copa del Mundo"?'imageVcardAlberto':"imageVcard"} src={props.image}  alt=""/>  </a>:null}
    //   <div className="cardRating">Rating ={' '+props.rating}</div>
    //   <div className="cardCategory">Categoria ={' '+props.category}</div>
    // </div>

    <div>
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
        <div className="card" key={props.id}>
          <img src={!props.image ? null : props.image} />
          <div className="card_text">
            <h3>{props.name}</h3>
            <b>Rating: {props.rating}</b>
            <b>Categoria: {props.category}</b>
          </div>
        </div>
      </a>
    </div>
  );
}
