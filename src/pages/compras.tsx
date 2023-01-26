import Head from 'next/head'
import Compras from '../components/Compras/Compras'

function createP() {

  return (
    <div>
      <Head><title>3DSeller</title></Head>
      
      <Compras />
     
    </div>
  )
}
export default createP