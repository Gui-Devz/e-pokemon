import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PokedexProvider } from "../hooks/usePokedex";
import { CartProvider } from "../hooks/useCart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PokedexProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </PokedexProvider>
  );
}
export default MyApp;
