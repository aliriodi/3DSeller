import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { store }  from '../redux/store';
import { Provider } from 'react-redux';
import Head from 'next/head'
import Nav from '../components/Nav/Nav'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
       <PayPalScriptProvider
        clientId={'ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs'}
        onError={(error) => console.log(error)}
      >
    <Provider store={store}>
       <Head><title>3DSeller </title>
       
       <link rel="shortcut icon" type="image/png" href="/logo.png" />
        </Head>
      <Nav />
      <Component {...pageProps} >
      
      </Component>
        
    </Provider>
    </PayPalScriptProvider>
    </UserProvider>
    )
}
