import React  from 'react'

export default function Vcard(props) {
  return (
    <div className="card">
       <h4 className="cardTitle">{props.name}</h4>
       {props.image?<a href={`/productos/${props.id}`}>
      <img  className={props.name==="Alberto Presto Pronta"||props.name==="La Copa del Mundo"?'imageVcardAlberto':"imageVcard"} src={props.image}  alt=""/>  </a>:null}
      <div className="cardRating">Rating ={' '+props.rating}</div>
      <div className="cardCategory">Categoria ={' '+props.category}</div>
    </div>
  )
}
