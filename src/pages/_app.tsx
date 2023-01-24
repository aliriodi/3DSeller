import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Footer from "../components/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Head>
          <title>3DSeller </title>
          {/* <link rel="shortcut icon" type="image/png" href="/logo.png" /> */}
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        </Head>
        <Nav />
        <Component {...pageProps}></Component>
        <Footer />
      </Provider>
    </UserProvider>
  );
}
