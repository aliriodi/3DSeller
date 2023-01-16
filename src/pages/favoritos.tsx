import Head from "next/head";
import Create from "../components/FavButton/Favoritos";

export default function favoritos() {
  return (
    <div>
      <Head>
        <title>3DSeller - Favoritos</title>
      </Head>
      <Create />
    </div>
  );
}
