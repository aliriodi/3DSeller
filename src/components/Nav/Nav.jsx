import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import Link from 'next/link';
import home from './house.png'
import LogButton from '../LogButton/LogButton'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client';

function Nav() {

    const { push } = useRouter()
    const { isLoading, user, error } = useUser()

    if(isLoading) return <h1>Loading...</h1>

    const handleLogin = () => push('/api/auth/login')
    const handleLogout = () => push('/api/auth/logout')

    return (

    <>
		<header>
        {/* <!-- Nav -->  */}
        <div className="nav">
            {/* <!-- Logo -->  */}
            <Link href={'/'} legacyBehavior>
            <a className="nav-logo" >
            <Image src={logo}  alt="13" className='nav-logo_img'/>
                3D<span className='span1'>SELLER</span>
                </a>
            </Link>
            {/* <!-- Nav Icons --> */}
            {user ? (
                <>
                    <h1>{user.name}</h1>
                    <LogButton handleLogin={handleLogout} className='btn' id="bell-icon" />
                </>
            ) : (
               <div className="nav-icons">
                    <LogButton handleLogin={handleLogin} className='btn' id='bell-icon' />
                </div> 
            )}
            
            <div className="nav-icons">
                <Link href={"/productos"} legacyBehavior>
                <a className="btn" id="bell-icon" >Productos</a>
                </Link>
            </div>
            <div className="nav-icons">
                <Link href={"/contacto"} legacyBehavior>
                <a className="btn" id="bell-icon">Contacto</a>
                </Link>
            </div>
            <div className="nav-icons">
                <Link href={"/archivo"} legacyBehavior>
                <a className="btn" id="bell-icon">Archivo</a>
                </Link>
            </div>
            <div className="nav-icons">
                <Link href={"/recursos"} legacyBehavior>
                <a className="btn" id="bell-icon">Recursos</a>
                </Link>
            </div>
            <div className="nav-icons">
                <Link href={"/createP"} legacyBehavior>
                <a className="btn" id="bell-icon">Crear Producto</a>
                </Link>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Nav
