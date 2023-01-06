import React  from 'react';
import imghc from '../../public/model3d.png';

export default function Vcard(props) {
  return (
    <div className="card">
       <h4 className="cardTitle">{props.name}</h4>
       {props.id?<a href={`/productos/${props.id}`}>
      <img  className={props.name==="Alberto Presto Pronta"||props.name==="La Copa del Mundo"?'imageVcardAlberto':"imageVcard"} src={props.image?props.image:'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.1c0eb044.jpeg&w=1080&q=75'}  alt=""/>  </a>:null}
      <div className="cardRating">Rating ={' '+props.rating}</div>
      <div className="cardCategory">Categoria ={' '+props.category}</div>
    </div>
  )
}
