import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import logo from '../../public/Logo.png'
import home from './house.png'

function Nav() {
  const router = useRouter();
  return (

    <div>
       	<div className="container">
            <div className="logo"><a href="/">
            <Image src={logo}  alt="13" className='imglogo'  priority />
              </a></div>
            <a href="/" className="item">
            <Image src={home}  alt="13" className='homeimg'  priority />
            </a>
            <a href="/productos" className="item">Productos</a>
            <a href="/" className="item">Contact</a>
            <a href="/" className="item">Archive</a>
            <a href="/" className="item">Resource</a>
            <a href="/createP" className="item">Crear Producto</a>


    <>
		<header>
        {/* <!-- Nav -->  */}
        <div className="nav">
            {/* <!-- Logo -->  */}
            <a className="nav-logo" onClick={()=>router.push('/')}>
            <Image src={logo}  alt="13" className='nav-logo_img'/>
                3D<span className='span1'>SELLER</span>
                </a>
            {/* <!-- Nav Icons --> */}
            <div className="nav-icons">
                <a className="btn" id="bell-icon" onClick={()=>router.push('/productos')}>Productos</a>
            </div>
            <div className="nav-icons">
                <a className="btn" id="bell-icon">Contacto</a>
            </div>
            <div className="nav-icons">
                <a className="btn" id="bell-icon">Archivo</a>
            </div>
            <div className="nav-icons">
                <a className="btn" id="bell-icon">Recursos</a>
            </div>
            <div className="nav-icons">
                <a className="btn" id="bell-icon">Ayuda</a>

            </div>
        </div>
            </header>
		</>
  )
}
export default Nav