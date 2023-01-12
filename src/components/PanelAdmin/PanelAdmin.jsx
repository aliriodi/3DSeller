import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts , getRender, resetState,} from "../../redux/DSellerActions";
import img from "../LogButton/perfil-icon_default.png"

function PanelAdmin(){

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const { 
        products,
        count
    } = useSelector(state => state.products);

    //#region Etadisticas Totales
    const [currentCantProducts, setCurrentCantProducts] = useState(0)
    const [currentCantUsers, setCurrentCantUsers] = useState(0)
    const [currentPurchases, setCurrentPurchases] = useState(0)

    //#endregion

    return(
        <>
        <div>
            {/* Tablero */}
            <div className='dashboard-container'>

                {/* Estadisticas Totales */}
                <div className='dashboard-container_stats'>

                    {/* Usuarios Totales */}
                    <div className='stats-total'>

                        {/* Cantidad */}
                        <div className='stats-total_text'>
                            <h3>1000</h3>
                            <p>Usuarios</p>
                        </div>

                        {/* Icono */}
                        <div className='stats-total_icon'>
                            <Image src={img} alt="img"/>
                        </div>

                    </div>

                    {/* Productos Totales */}
                    <div className='stats-total'>

                        {/* Cantidad */}
                        <div className='stats-total_text'>
                            <h3>1000</h3>
                            <p>Productos</p>
                        </div>

                        {/* Icono */}
                        <div className='stats-total_icon'>
                            <Image src={img} alt="img"/>
                        </div>

                    </div>
                    
                    {/* Compras Totales */}
                    <div className='stats-total'>
                        
                        {/* Cantidad */}
                        <div className='stats-total_text'>
                            <h3>1000</h3>
                            <p>Compras</p>
                        </div>

                        {/* Icono */}
                        <div className='stats-total_icon'>
                            <Image src={img} alt="img"/>
                        </div>

                    </div>
                </div>

                {/* Estadisticas Recientes */}
                <div className='dashboard-container_stats'>

                    {/* Compras Recientes */}
                    <div className='stats-recent'>
                        <div className="stats-recent_text">
                            <h3>Compras Recientes</h3>
                            <div className="btn-container">
                                <a href={""} className="btn">
                                    Ver Todas
                                </a>
                            </div>
                        </div>
                        <ul className="stats-recent_list">
                            <li className="stats-recent_list-item">
                                <span>Nombre</span>
                            </li>
                            <li className="stats-recent_list-item">
                                <span>Precio</span>
                            </li>
                            <li className="stats-recent_list-item">
                                <span>Stock</span>
                            </li>
                        </ul>
                    </div>

                    {/* Usuarios recientes */}
                    <div className='stats-recent'></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PanelAdmin;