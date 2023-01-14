import { getProducts, GetUserBDL} from "../../redux/DSellerActions";
import { useDispatch } from "react-redux"
import { useState } from "react";
import Image from "next/image";
import menuImg from './menu.png'

const ListProducts = (props)=>{
    const [dropdownActive, setDropdownActive] = useState(false)

    const dispatch = useDispatch();
    
    const deleteProducts = ()=>{
        // alert(`${props.name} Eliminado`)
        console.log()
        dispatch(getProducts);
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
                <span>{props.name}</span>
            </li>
                                
            <li className="stats-recent_list-item text-right">
                <span>{props.price}</span>
            </li>

            <li className="stats-recent_list-item">
                <span>{props.stock}</span>
            </li>
            <li className={`dropdown-container`}>
                <span className="dropdown-icon" onClick={handleDropdown} id={`dropdown-${props.id}`}>
                    ...
                    {/* <Image src={menuImg}/> */}
                </span>
            <li className={`dropdown ${dropdownActive == true?"":"desactive"}`}>
                <a  href={`/productos/${props.id}`} className="dropdown-option">
                    Ver Producto
                </a>
                <div onClick={deleteProducts} className="dropdown-option">
                    Eliminar Producto
                </div>
            </li>
            </li>
         </ul> 
    )
}

export default ListProducts;