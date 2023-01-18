import React from "react";
import Image from "next/image";
import pla1 from "../../public/pla1.jpg";
import pla2 from "../../public/pla2.jpg";
import hips from "../../public/hips.png";
import background from "../../public/farm.jpeg";
import Link from "next/link";
import { useSelector } from "react-redux";
import UserBaned from "components/UserBaneds/UserBaned";

export default function Home() {
  const { user } = useSelector((state) => state.products);

  return user.rol === "banned" ? (
    <UserBaned />
  ) : (
    <>
      
      {/* <!-- Row 1 --> */}
      <div className="row-1" id="row-1">
        <div className="wrapper">
          <h2>PASOS PARA COMENZAR</h2>

          {/* <!-- Steps --> */}
          <ul className="steps">
            <li>
              <h3>Acido Poliláctico o Acido Láctico (PLA)</h3>
              <Image src={pla1} alt="16" className='pla1' />
              <Image src={pla2} alt="15" className='pla2' />
               El filamneto PLA fue inventado en 1930 por el químico Wallace Carothers y se inicio 
               su uso en productos de la empresa alimentaria como bandejas, tapas y otros.

               El filamento PLA es uno de los más utilizados tanto en la impresión 3D industrial
               como en las impresoras domésticas. Lejos de ser un material plástico de producción
               tradicional o altamente contaminante, el PLA es un filamento más respetuoso con el 
               medio ambiente ya que no requiere de recursos finitos como el petróleo. 
               Te explicamos algunas claves para que lo incorpores a tus procesos de fabricación
               aditiva.

               El filamento PLA ofrece buenas prestaciones al combinar una alta velocidad de 
               impresión con unos bordes muy definidos siempre y cuando el material se enfríe 
               correctamente. Además, los modelos que imprime tienen una deformabilidad muy baja. 
               Este tipo de filamento posee una vida útil de al menos 12 meses si se conserva
               entre 15º y 25º C, por lo que es apto para almacenamiento.

               Caracteristicas
                 Inodoro, permanente, claro y brillante.
                 Altamente resistente ante la humedad y la grasa.
                 Similar al polietileno en cuanto a desarrollar barreras para sabores y olores.
                 Suficientemente extensible y elástico.
                 Su nivel de inflamabilidad es muy bajo lo que lo hace estable a la luz UV.
                 Aunque es flexible el PLA 3D puede formularse a fin de que sea rígido.
                 Puede copolimerizarse con otros materiales.
                 Su proceso de fabricación puede variarse a fin de adoptar características mecánicas.
                 El rango de temperatura de impresión está entre 190º - 220º C
                 Despues de impreso la pieza es endeble a temperaturas entre 60º - 70º C 
 

               Es usado para piezas de acabdos vehiculares, carcazas de electrodomesticos, industria medica, 
               textil y otros.
            </li>

            <li>
              <h3>Poliestireno de Alto Impacto o High Impact Polystyrene (HIPS)</h3>
              <Image src={hips} alt="15" className='pla2' />
                Es un polímero termoplástico basado en una mezcla de poliestireno y caucho de polibutadieno
                
                Por su alta resistencia a impactos y poca deformabilidad a latas temperaturas el filamento
                HIPS ha sido usado para impresion de elementos que estan sometidos a posibles cambios de temperaturas bruscos, 
                altas temperaturas y presion, tambien es usado como base para otras estructuras cuando la impresion
                es modular o requiere bases y/o partes de union de alta resistencia.

                El acabado de HIPS es una superficie lisa y resistente a los arañazos, su resistencia al calor y el color 
                translúcido a blanco, lo que simplifica la coloración y permite el uso de HIPS además de usarse 
                como estructura de soporte para otras áreas de aplicación. 

                Caracteristicas
                 Puede copolimerizarse con otros materiales.
                 Se puede cromar, pintar, pegar y lijar.
                 Por sus propiedades suele usarse en instalaciones de alta frecuencia Electromagnetica.
                 Es resistente a los lubricantes, grasas y álcalis pero no al combustible.
                 El rango de temperatura de impresión está entre 230º - 245º C
                 Despues de impreso la pieza es endeble a temperaturas entre 90º - 110º C 

                 El HIPS es muy empleado en: disfraces o partes (máscaras, elementos de vestuario, cascos),
                 modelado  (maquetas, figuras), prototipos (componentes resistentes y ligeros), 
                 elementos decorativod (ornamentos, elementos colgantes, lámparas), 
                  union con otros filamentos (soporte para otras impresiones)


            </li>
            <li>
              <h3>TPE</h3>
              
            </li>
            <li>
              <h3>PETG</h3>
              
            </li>
            <li>
              <h3>Acrilonitrilo Butadieno Estireno (ABS)</h3>
              El filamento de ABS, es un polímero termoplástico bastante común 
              en la industria, conocido principalmente por su buena resistencia a las bajas temperaturas y
               su peso liviano.

               El plástico ABS también es muy popular en el mercado de la impresión FDM o de deposición 
               fundida, seguramente uno de los plásticos más utilizados en la impresión 3D.

               Principalmente utilizado en el sector de electrodomésticos, 
               también se encuentra en cascos de barcos, decoración o juguetes, 
               especialmente en los famosos ladrillos desarrollados por LEGO

               Caracteristicas
                 Inodoro, permanente, claro y brillante.
                 Debe mantenerse seco porque absorbe la humedad del aire.
                 En cuanto al soporte de impresión, ten en cuenta que el ABS es fácil de imprimir con HIPS. 
                 Suficientemente extensible y elástico.
                 Su nivel de inflamabilidad es muy bajo lo que lo hace estable a la luz UV.
                 Puede copolimerizarse con otros materiales.
                 El rango de temperatura de impresión está entre 230º - 260º C
                 Despues de impreso la pieza es endeble a temperaturas entre 70º - 80º C 
 
               

            </li>
          </ul>

       
        </div>
      </div>

    </>
  );
}
