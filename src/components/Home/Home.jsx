import React  from 'react';
import Image from 'next/image';
import logo from '../../public/farm.jpeg';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();
  return (
  
    <div className='container0'>
      
      <div className='flex-container'>
        <div className='card0' >
           <h1>3DSeller</h1>
     Es su centro de producción de fabricación aditiva de piezas impresas en 3D. Con más de 30 materiales para cualquier aplicación, obtendrá las piezas que necesita con solo contratarnos.
      </div>    
       
      
      
        <div className='card1' >
       Nuestra granja de impresoras 3D mostradas a continuacion trabajaran para dar el mejor servicio del mercado que Ud. pueda imaginar.
       <Image src={logo}  alt="13" className='imgfarm'  priority />
        </div>
      
     
     
       <div className='card2' >
        <h1>Pasos para comenzar</h1>
          <ul>
            <li><h2>Paso 1</h2>
                Para poder habilitar mas opciones a su servicio le recomendamos loggearse, a traves de su cuenta google o local con nosotros. De igual forma  puede visualizar nuestros servicios como invitado.
            </li>
            <li><h2>Paso 2</h2>
                Si desea adquirir nuestros productos o asesoramiento es necesario loggearse, una vez logueado podra gozar de nuestras ventas personalizadas para ud. y soporte tecnico.
            </li>
            <li><h2>Paso 3</h2>
                Disfrute al comprar nuestros productos o adjuntar archivos tipo <strong>.gcode</strong>, antes de pagar le indicamos tiempo de entrega estimado y formas de envio o retiro personalmente por nuestras oficinas si asi lo desea.
            </li>
          </ul>
      
      <div className='buttonproductsH'><button onClick={()=>router.push('/productos')}  className='buttonhome' >VER NUESTROS MODELOS 3D</button></div>
      <div className='buttonUpModelH'><button  className='buttonhome' >SUBIR MODELO 3D</button></div> 
      
       </div>
       <div className='card2' >
        <h1>¿POR QUE NOSOTROS?</h1>
          <ul>
            <li><h2>La mejor tecnología</h2>
            Procesos eficientes, resultados de calidad en tiempo y forma, clientes 100% satisfechos.
            </li>
            <li><h2>Producciones unicas o en serie</h2>
            Impresiones de acuerdo a su necesidad, en cantidades unicas o producción en serie con tiempos de entrega planificados, pudiendo mejorar tiempos en funcion a sus necesidades como clientes.
            </li>
            <li><h2>Modelos sin limites</h2>
                Podemos diseñar su modelo, imprimir su modelo diseñado y nuestros modelos prediseñados, el limite es su imaginación.
            </li>
            <li><h2>Consultorias</h2>
                Hacemos consultorias Online planificadamente de acuerdo a horarios variados y citas previas agendadas por nuestro cliente de acuerdo a la disponibilidad de nuestra agenda.
            </li>
            <li><h2>Diferentes formas de pago</h2>
                Podemos recibir pagos digitales en cualquier moneda bajo nuestra plataforma de Crypto pagos o afiliados a MercadoPago asi como plataformas bancarias.
            </li>
            <li><h2>Diversidad de Materiales</h2>
                Podemos imprimir en variedad de colores y materiales gracias a nuestro amplio stock en filamentos y acceso a multiproveedores.
            </li>
          </ul>
          </div>
        </div>
    </div>
     
  )
}

export default Home
