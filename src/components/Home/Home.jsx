import React  from 'react';
import Image from 'next/image';
import model3d from '../../public/model3d.png'
import background from '../../public/farm.jpeg';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();
  return (
  
    <>
    {/* <!-- Banner --> */}
    <section className='banner-container'>
        <div className="wrapper">

            {/* <!-- Banner Text --> */}
        <div className="banner-container_text">
            <h1>3DSeller</h1>
            <p>
                Es su centro de producción de fabricación aditiva de piezas impresas en 3D. Con más de 30 materiales para cualquier aplicación, obtendrá las piezas que necesita con solo contratarnos.
            </p>
            <a href={"#row-1"} className="btn-start">EMEPECEMOS</a>
        </div>

        {/* <!-- Banner Img --> */}
        <div className="banner-container_img">
            <Image src={model3d}/>
        </div>

        {/* <!-- Nuestra granja de impresoras 3D mostradas a continuacion trabajaran para dar el mejor servicio del mercado que Ud. pueda imaginar. --> */}
        </div>
        <Image src={background} alt="maquinas" className="banner-container_background"/>
      </section>

    {/* <!-- Row 1 --> */}
      <div className='row-1' id="row-1">
      	<div className="wrapper">
      		<h2>PASOS PARA COMENZAR</h2>

      		{/* <!-- Steps --> */}
      			<ul className="steps">
      				<li>
      					<h3>PASO 1</h3>
      				Para poder habilitar mas opciones a su servicio le recomendamos loggearse, a traves de su cuenta google o local con nosotros. De igual forma  puede visualizar nuestros servicios como invitado.
      				</li>

      				<li>
      					<h3>PASO 2</h3>
                     Si desea adquirir nuestros productos o asesoramiento es necesario loggearse, una vez logueado podra gozar de nuestras ventas personalizadas para ud. y soporte tecnico.
                     </li>
                     <li>
                 	    <h3>PASO 3</h3>
                 	Disfrute al comprar nuestros productos o adjuntar archivos tipo <strong>.gcode</strong>, antes de pagar le indicamos tiempo de entrega estimado y formas de envio o retiro personalmente por nuestras oficinas si asi lo desea.
                     </li>                 
      		    </ul>

      		    {/* <!-- Btn --> */}
      		    <div className="btn-container">
      		    	<span className='btn' onClick={()=>router.push('/productos')}>VER NUESTROS MODELOS 3D</span>
      		        <span className='btn'>SUBIR MODELO 3D</span>
      		    </div>
      		</div>
      	</div>

    {/* <!-- Row 2 --> */}
      	<div className='row-2' >
            <div className="wrapper">
                <h2>¿POR QUE NOSOTROS?</h2>

                {/* <!-- Columns --> */}
                <div className="column">
                    {/* <!-- Column 1 --> */}
          <ul className="column_text">
            <li>
                <h3>La mejor tecnología</h3>
            Procesos eficientes, resultados de calidad en tiempo y forma, clientes 100% satisfechos.
            </li>
            <li>
                <h3>Producciones unicas o en serie</h3>
            Impresiones de acuerdo a su necesidad, en cantidades unicas o producción en serie con tiempos de entrega planificados, pudiendo mejorar tiempos en funcion a sus necesidades como clientes.
            </li>
            <li>
                <h3>Modelos sin limites</h3>
                Podemos diseñar su modelo, imprimir su modelo diseñado y nuestros modelos prediseñados, el limite es su imaginación.
            </li>
           </ul>

           {/* <!-- Column 2 --> */}
           <ul className="column_text">
            <li>
                <h3>Consultorias</h3>
                Hacemos consultorias Online planificadamente de acuerdo a horarios variados y citas previas agendadas por nuestro cliente de acuerdo a la disponibilidad de nuestra agenda.
            </li>
            <li>
                <h3>Diferentes formas de pago</h3>
                Podemos recibir pagos digitales en cualquier moneda bajo nuestra plataforma de Crypto pagos o afiliados a MercadoPago asi como plataformas bancarias.
            </li>
            <li>
                <h3>Diversidad de Materiales</h3>
                Podemos imprimir en variedad de colores y materiales gracias a nuestro amplio stock en filamentos y acceso a multiproveedores.
            </li>
          </ul>
                </div>
           
            </div>
          </div>
    </> 
  )
}

export default Home
