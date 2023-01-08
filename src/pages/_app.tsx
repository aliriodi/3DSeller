import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { store }  from '../redux/store';
import { Provider } from 'react-redux';
import Head from 'next/head'
import Nav from '../components/Nav/Nav'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
       <Head><title>3DSeller</title>
        </Head>
      <Nav />
      <Component {...pageProps} >
      
      </Component>
        
    </Provider>
    )
}
