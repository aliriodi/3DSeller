import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { store }  from '../redux/store';
import { Provider } from 'react-redux';
import {Head}  from 'next/document';
import Nav from '../components/Nav/Nav'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
     
      <Nav />
        <Component {...pageProps} />
        
    </Provider>
    )
}
