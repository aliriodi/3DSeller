import Image from "next/image";
import imgIcon from "../LogButton/perfil-icon_default.png"

const ReviewList = (props)=>{
    return(
        <>{/* Reseñas */}
        <div className="user-review">
          {/* Datos De Usuario */}
          <div className="user-container">
          <div className="user-dates">
            <div className="user-container_icon">
            <Image src={imgIcon} alt="user"/>
            </div>
            <p>{props.email}</p>
          </div>
          <div className="user-star">
            <span className={`${props.rating >= 1?"star-on":"star-off"}`}>{props.rating >= 1?"★":"☆"}</span>
            <span className={`${props.rating >= 2?"star-on":"star-off"}`}>{props.rating >= 2?"★":"☆"}</span>
            <span className={`${props.rating >= 3?"star-on":"star-off"}`}>{props.rating >= 3?"★":"☆"}</span>
            <span className={`${props.rating >= 4?"star-on":"star-off"}`}>{props.rating >= 4?"★":"☆"}</span>
            <span className={`${props.rating >= 5?"star-on":"star-off"}`}>{props.rating >= 5?"★":"☆"}</span>
          </div>
          </div>
  
          {/* Comentrio De Usuario*/}
          <div className="user-commentary">
            <p>{props.commentary}</p>
          </div>
        </div>
        </>
    )
}
export default ReviewList;