import React from 'react'
import Image from 'next/image'
import logo from './Logo.jpeg'
import home from './house.png'

function Nav() {
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
            <a href="/" className="item">Help</a>
            </div>
    </div>
  )
}
export default Nav