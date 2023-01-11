import Image from "next/image";
import img from "../LogButton/perfil-icon_default.png"

function PanelAdmin(){
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
                        </div>

                        {/* Icono */}
                        <div className='stats-total_icon'>
                            <Image src={img} alt="img"/>
                        </div>

                    </div>
                </div>

                {/* Estadisticas Recientes */}
                <div className='dashboard-container_stats'>

                    {/* Ordenes Recientes */}
                    <div className='stats-recent'></div>

                    {/* Usuarios recientes */}
                    <div className='stats-recent'></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PanelAdmin;