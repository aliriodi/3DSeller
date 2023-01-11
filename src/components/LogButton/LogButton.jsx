import perfilIcon from "./perfil-icon_default.png"
import Image from 'next/image'

export default function LogButton({ handleLogin }) {
  return (
    <>
        <div onClick={handleLogin} className="nav-icons nav-icons_logIn">
          <Image
          src={perfilIcon} 
          alt="perfil" 
          className='btn-logIn'
          id='bell-icon'/>
        </div>
    </>
  )
}
