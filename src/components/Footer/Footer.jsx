import React from "react";
import Image from "next/image";
import emailImg from "../../public/email-icon.png";
import locationImg from "../../public/location-icon.png";
import movileImg from "../../public/movile-icon.png";
import Link from "next/link";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer id="row-1">
      {/* Nosotros */}
      <div className="footer-data">
        <h3> Nosotros </h3>
        <div className="footer-data_item">
          <p>
            3DSeller es una empresa con alto compromiso con los clientes y con
            la capacidad tecnica necesaria para poder hacer sus necesidades
            realidad sin importar la complejidad de su diseño
          </p>
        </div>
      </div>

      {/* Contacto */}
      <div className="footer-data">
        <h3> Contacto </h3>
        <div className="footer-data_item">
          <Image src={emailImg} alt="Email" />
          <Link href={"mailto: threedseller@gmail.com"} legacyBehavior> 
          <a >threedseller@gmail.com</a>
          </Link>
        </div>
        <div className="footer-data_item">
          <Image src={movileImg} alt="Movil" />
          <a >+543516132710</a>
        </div>
        <div className="footer-data_item">
          <Image src={locationImg} alt="Ubicacion" />
          <p>
            Argentina - Cordoba Capital Barrio Pueyrredon CP X5004
            <br />
            Calle Fray Mamerto Esquiu 1431
          </p>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="footer-data">
        <h3> Redes sociales </h3>
        <div className="footer-data_item">
          <a  className="social">
          <Link href={"/"} legacyBehavior> 
            <AiFillFacebook />
            Facebook
            </Link>
          </a>
        </div>
        <div className="footer-data_item">
          <a  className="social">
          <Link href={"/"} legacyBehavior> 
            <AiFillInstagram />
            Instagram
            </Link>
          </a>
        </div>
        <div className="footer-data_item">
          <a  className="social">
          <Link href={"/"} legacyBehavior> 
            <AiFillLinkedin />
            Linkedin
            </Link>
          </a>
        </div>
        <div className="footer-data_item">
          <a  className="social">
          <Link href={"/"} legacyBehavior> 
            <AiFillTwitterCircle />
            Twitter{" "}
            </Link>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <span className="copyright">
        {" "}
        © Copyright - 3DSeller | All Right Reserverd
      </span>
    </footer>
  );
}
