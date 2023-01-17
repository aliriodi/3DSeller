import Head from "next/dist/shared/lib/head";
import Baned from "../components/UserBaneds/UserBaned";

export default function Baneds() {
  return (
    <div>
      <Head>
        <title>3DSeller - Banned</title>
      </Head>
      <Baned />
    </div>
  );
}
