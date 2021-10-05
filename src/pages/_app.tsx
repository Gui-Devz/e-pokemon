import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PokedexProvider } from "../hooks/usePokedex";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PokedexProvider>
      <Component {...pageProps} />
    </PokedexProvider>
  );
}
export default MyApp;
