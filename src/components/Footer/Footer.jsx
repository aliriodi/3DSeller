import React from "react";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai";
export default function Footer() {
  return (
    <footer className="row-1" id="">
      <div className="row2">
        <div className="">
          <h2 className=""> Nosotros </h2>
          <p>
            3DSeller es una empresa con alto compromiso con los clientes y con
            la capacidad tecnica necesaria para poder hacer sus necesidades
            realidad sin importar la complejidad de su diseño
          </p>
        </div>
        <br></br>
        <div className="">
          <h2> Contacto </h2>
          <ul>
            <li> +543516132710 </li>
            <li> threedseller@gmail.com </li>
            <li>
              Argentina - Cordoba Capital Barrio Pueyrredon CP X5004 Calle Fray
              Mamerto Esquiu 1431
            </li>
          </ul>
        </div>
        <br />
        <div className="">
          <h2> Redes sociales </h2>
          <ul>
            <div>
              <AiFillFacebook />
              <li> Facebook </li>
            </div>
            <div>
              <AiFillInstagram />
              <li> Instagram </li>
            </div>
            <div>
              <AiFillLinkedin />
              <li> Linkedin </li>
            </div>
            <div>
              <AiFillTwitterCircle />
              <li> Twitter </li>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
}
