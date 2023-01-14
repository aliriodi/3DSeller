import { getProducts, getUser} from "../../redux/DSellerActions";
import { useDispatch } from "react-redux"
import { useState } from "react";
import Image from "next/image";
import menuImg from './menu.png'

const ListUsers = (props)=>{
    const [dropdownActive, setDropdownActive] = useState(false)

    const dispatch = useDispatch();
    
    const changeRolUser = ()=>{
        alert(`${props.name}`)
    }

    const banUser = ()=>{
        alert(`${props.name}`)
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
                                
            <li className="stats-recent_list-item">
                <span>{props.name}</span>
            </li>

            <li className="stats-recent_list-item">
                <span>{props.rol}</span>
            </li>
            <li className={`dropdown-container`}>
                <span className="dropdown-icon" onClick={handleDropdown} id={`dropdown-${props.id}`}>
                    .
                    {/* <Image src={props.img}/> */}
                </span>
            <li className={`dropdown ${dropdownActive == true?"":"desactive"}`}>
                <a  href={`/user/${props.id}`} className="dropdown-option">
                    Ver Perfil
                </a>
                <div onClick={changeRolUser} className="dropdown-option">
                    Hacer Admin
                </div>
                <div onClick={banUser} className="dropdown-option">
                    Bannear
                </div>
            </li>
            </li>
         </ul> 
    )
}

export default ListUsers;