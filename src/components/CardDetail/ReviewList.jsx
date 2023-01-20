import Image from "next/image";
import { useState } from "react";
import imgIcon from "../LogButton/perfil-icon_default.png"
import { getProducts, getAllUser,modificarUser, getUser} from "../../redux/DSellerActions";
import { useDispatch, useSelector } from "react-redux"


const ReviewList = (props)=>{
  const [dropdownActive, setDropdownActive] = useState(false);
  
  const dispatch = useDispatch();
    
  const bannedUser = ()=>{
      if(props.rol != "banned")dispatch(modificarUser({...props.user,rol:"banned"}));
      else dispatch(modificarUser({...props.user,rol:"client"}));
      dispatch(getAllUser())
      .then(()=>dispatch(getUser()))
  }
  
  const adminUser = ()=>{
      if(props.rol == "client")dispatch(modificarUser({...props.user,rol:"admin"}))
      if(props.rol == "admin")dispatch(modificarUser({...props.user,rol:"client"}))
      dispatch(getAllUser())
      .then(()=>dispatch(getUser()))
  }

  //#region Dropdown
  window.addEventListener('click', function(event){
      if(event.target.id != `dropdown-${props.id}`)setDropdownActive(false)
      else return
  })
  
  const handleDropdown = ()=>{
      if(dropdownActive == false)setDropdownActive(true);
      if(dropdownActive == true)setDropdownActive(false);
  }
  //#endregion

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
            
            {/* Menu */}
            
          </div>
        </div>
        </>
    )
}
export default ReviewList;