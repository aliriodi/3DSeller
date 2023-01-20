import React from "react";
import Image from "next/image";
import pla1 from "../../public/pla1.jpg";
import pla2 from "../../public/pla2.jpg";
import hips from "../../public/hips.png";
import trian from "../../public/piramidefilamentos.png";
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
      <div className="blog-container" id="row-1">
      <div>
            En 3DSeller deseamos brindarle un asesoramiento y guia completa de materiales que podemos 
            usar actualmente sin limitarnos a estos, si desea un asesoramiento particular de otro 
            material por favor le solicitamos que nos contace a traves de nuestro enlace 
            <div className="btn-container2"><Link href={"/contacto"} className="btn">Contacto</Link></div>
            
          <Image src={pla1} alt="16" className='pla1' />
          
          Aunque todos los filamentos a simple vista parecen iguales, a la hora de emplearlos
          cada uno tiene características (resistencia, moldeabilidad a temperatura, fatiga, velocidad de impresion) 
          fisicas diferentes y metodos de impresion distintos    
          <Image src={pla2} alt="15" className='pla2' />
          Por eso le mostramos a continuacion una imagen resumen donde rapidamente podra darse una idea 
          de la aplicacion de cada material de acuerdo a su necesidad. 
          <Image src={trian} alt="16" className='triang' />
          
          A continuacion presentamos una tabla comparativa resumen para posteriormente ir al detalle de cada 
          material tarbajado en 3DSeller.
          
          <table>
          <thead>
<tr>
  <td><strong>CARACTERISTICA</strong></td>
  <td><strong>Ponderacion</strong></td>
  <td><strong>TIPO MATERIAL</strong></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>

<tr>
  <td></td>
  <td></td>
  <td>PLA</td>
  <td>HIPS </td>
  <td>TPE</td>
  <td>ABS</td>
  <td>Filamento de Carbono</td>
</tr>
<tr>
  <td>Resistencia impacto</td>
  <td>1: Baja - 5:Alta</td>
  <td> 3</td>
  <td> 4</td>
  <td> 4</td>
  <td> 3</td>
  <td> 5</td>
</tr>

<tr>
<td>Resistencia a la fatiga</td>
  <td>1: Baja - 5:Alta</td>
  <td> 3</td>
  <td> 3</td>
  <td> 4</td>
  <td> 3</td>
  <td> 5</td>
</tr>

<tr>
<td>Resistencia a la fatiga</td>
  <td>Centigrados</td>
  <td> 60º - 70º</td>
  <td>  90º - 110º</td>
  <td> 55º - 65º</td>
   <td> 60º - 75º</td>
  <td>  200º - 250º</td>
</tr>
<tr>
<td>Tiempo de impresion</td>
  <td>1: Lento - 5:Rapido</td>
  <td> 5</td>
  <td>  4</td>
  <td> 4</td>
   <td> 5</td>
  <td>  3</td>
</tr>
<tr>
<td>Requiere base de impresion</td>
  <td>Si - No - Posible</td>
  <td> Posible</td>
  <td>  No </td>
  <td> Posible </td>
   <td> Si </td>
  <td>  No </td>
</tr>
</thead>
</table>


          A continuacion damos detalle de cada material con sus caracteristicas particulares.
            </div>
            <div>
              <h3>Acido Poliláctico o Acido Láctico (PLA)</h3>
              
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
            </div>

            <div>
              <h3>Poliestireno de Alto Impacto o High Impact Polystyrene (HIPS)</h3>
             
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


            </div>
            <div>
              <h3>Elastómero Termoplástico (TPE)</h3>
              El filamento TPE es un materail diseñado para un mejor acabado sin embargo 
              requiere un control de velocidad de impresion lenta y controlada por la 
              elasticidad del material, Es extremadamente resistente a la fatiga cuando se 
              trata de flexionar, lo que lo hace perfecto para aquellas aplicaciones en 
              las que será necesario flexionar. Debido a sus magníficas propiedades eléctricas,
               se encuentra a menudo en aplicaciones donde se requiere evitar la conducción de 
               la electricidad como el cableado.
               El material TPE también es capaz de soportar temperaturas tan bajas como -30º C
                 y tan altas como 140º C grados centígrados.
                Para las empresas que buscan mejorar la forma en que trabajan y mejorar el 
                impacto en el medio ambiente, el TPE es un material específicamente bueno ya
                que es reciclable.

                El TPE es más difícil de imprimir en comparación con otros materiales de filamentos, 
                principalmente debido a su flexibilidad, sin embargo en 3DSeller estamos en la capacidad
                con nuestro equipo especialziado poder brindar un servicio de impresin de calidad en 
                cuaqluiera de sus materiales.

                Entre las multiples aplicaciones encontramos la empresa de alimentacion, medicina y 
                atencion sanitaria, la industria de los sellos, alambres, cables y fibra optica.
                 
                Caracteristicas
                 El mas flexible en lo que refiere a materiales de impresion.
                 Alatamente resistente a la fatiga por su flexibildiad.
                 Resistente a la abrasion quimica.
                 El rango de temperatura de impresión está entre 220º - 250º C
                 Despues de impreso la pieza es endeble a temperaturas entre 55º - 65º C 
                 
            </div>

            <div>
              <h3>Tereftalato de Polietileno Glycol-modificado (PETG)</h3>
              El PETG es un material menos rígido (más elástico) que el PLA
              En general el PETG resiste mejor los golpes, los esfuerzos y 
              “es más difícil de romper” tanto que el PLA como que el ABS
              El PETG es un poco más resistente a la temperatura que el PLA, pero menos que el ABS. 
              El PETG se empieza a ablandar a los 80ºC, más que el PLA 70ºC pero menos temperatura 
              que el ABS 105Cº. También, como hemos podido comprobar a través de la 
              experiencia de nuestros clientes con PETG, este material puede resistir
               también las bajas temperaturas durante periodos de tiempo prolongados.

               Caracteristicas
                 Inoloro, 
                 Debe mantenerse seco porque absorbe la humedad del aire.
                 Especial para trabajar a temperaturas bajo cero.
                 El rango de temperatura de impresión está entre 220º - 250º C
                 Despues de impreso la pieza es endeble a temperaturas entre 70º - 80º C 

                 El PETG es uno de los materiales más interesantes para impresión 3D. 
                 Combina las mejores características de los dos plásticos más populares:
                  propiedades mecánicas superiores a las del ABS y 
                  la facilidad de impresión y acabado del PLA. 
                  Elígelo para tus piezas más resistentes o cuando necesites soportar 
                  el ataque de productos químicos.
 
            </div>
            <div>
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
                 Emite olores en el proceso de impresion.
                 Debe mantenerse seco porque absorbe la humedad del aire.
                 En cuanto al soporte de impresión, ten en cuenta que el ABS es fácil de imprimir con HIPS. 
                 Suficientemente extensible y elástico.
                 Su nivel de inflamabilidad es muy bajo lo que lo hace estable a la luz UV.
                 Puede copolimerizarse con otros materiales.
                 El rango de temperatura de impresión está entre 230º - 260º C
                 Despues de impreso la pieza es endeble a temperaturas entre 70º - 105º C 

            </div>
            <div>
              <h3>Filamento Fibra de carbono (PEEK, PEK, PEI)</h3>
              
              El filamento Fibra de carbono es un material especial por su alta resistencia mecanica,
              5 veces mas fuerte que el acero y mas liviano, en la impresion 3D se emplea para
              piezas mecanicas de alta exigencia, como lo son carcasas para las computadoras 
               engranajes y poleas de vehiculos  (carros, autobuses, tractores), en el sector aeroespacial.
              El uso de este material es especifico para aplicacinoes especiales de alta exigencia 
              tanto en rigidez mecanica como en temperatura.

              Otros materiales como los que proporcionamos contienen desde un 4% hasta un 10% de 
              aprticulas de carbono, sin embargo este filamento contiene un 80% de particulas de 
              carbono haciendolo el mas resistente en la gama de filamentos de impresion.

               Caracteristicas
               Es el mas resistente de los materiales.
               Material especial  para altas exigencias mecanicas.

               El rango de temperatura de impresión está entre 300º - 400º C
               Despues de impreso la pieza es endeble a temperaturas entre 200º - 250º C 

 
            </div>
      </div>

    </>
  );
}
