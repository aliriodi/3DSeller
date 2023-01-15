import { getProducts, getAllUser,modificarUser, getUser} from "../../redux/DSellerActions";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";

const ListUsers = (props)=>{
    const [dropdownActive, setDropdownActive] = useState(false)

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
         <ul className="stats-recent_list">
            <li className="stats-recent_list-item text-left">
                <span>{props.email}</span>
            </li>
                                
            <li className="stats-recent_list-item text-left">
                <span>{props.name}</span>
            </li>

            <li className={`stats-recent_list-item`}>
                <span className={props.rol == "banned"?"error":null}>{props.rol}</span>
            </li>
            <li className={`dropdown-container`}>
                <span className="dropdown-icon" onClick={handleDropdown} id={`dropdown-${props.id}`}>
                    ...
                </span>

            {/* Opciones */}
            <li className={`dropdown ${dropdownActive == true?"":"desactive"}`}>
                
                <a  href={`/user/${props.id}`} className="dropdown-option">
                    Ver Perfil
                </a>
                
                <div onClick={adminUser} className={`dropdown-option ${props.rol == "banned"?"desactive":null}`}>
                    {props.rol=="admin"?"Quitar Admin":"Hacer Admin"}
                </div>

                {/* Banear Usuario */}
                <div onClick={bannedUser} className="dropdown-option">
                    {props.rol=="banned"?"Quitar Baneo":"Bannear"}
                </div>
            </li>
            </li>
         </ul> 
    )
}

export default ListUsers;