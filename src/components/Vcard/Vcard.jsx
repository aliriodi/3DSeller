import React  from 'react';
import imghc from '../../public/model3d.png';

export default function Vcard(props) {
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

    <a  href={`/productos/${props.id}`}>
      <div className="card" key={props.id}>
        <img src ={!props.image?null:props.image}/>
        <div className="card_text">
          <h3>{props.name}</h3>
          <b>Rating: {props.rating}</b>
          <b>Categoria: {props.category}</b>
        </div>
      </div>
    </a>
  )
}
