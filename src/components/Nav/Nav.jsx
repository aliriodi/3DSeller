import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import logo from '../../public/Logo.jpeg'

function Nav() {
    const router = useRouter();
    return (



        <>
            <header>
                {/* <!-- Nav -->  */}
                <div className="nav">
                    {/* <!-- Logo -->  */}
                    <a className="nav-logo" onClick={() => router.push('/')}>
                        <Image src={logo} alt="13" className='nav-logo_img' />
                        3D<span className='span1'>SELLER</span>
                    </a>
                    {/* <!-- Nav Icons --> */}
                    <div className="nav-icons">
                        <a className="btn" id="bell-icon" onClick={() => router.push('/productos')}>Productos</a>
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
        // * </div></div> 
    )
}
export default Nav
