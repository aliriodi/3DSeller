import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
import Products from '../components/Products/Products'
function Home() {

  return (
    <div>
      <Head><title>3DSeller</title></Head>
      
      <Products />
     
    </div>
  )
}

export default Home
