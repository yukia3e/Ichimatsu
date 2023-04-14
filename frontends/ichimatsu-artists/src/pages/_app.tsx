import { useEffect } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import router from "next/router";
import useSafeAuthStore from "@/stores/useSafeAuthStore";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const provider = useSafeAuthStore((state) => state.provider);
  const isLoggedIn = provider !== null;

  useEffect(() => {
    if (router.pathname === "/") {
      if (isLoggedIn) {
        router.push("/dashboard"); // eslint-disable-line @typescript-eslint/no-floating-promises
      }

      return;
    }
    if (isLoggedIn) {
      return;
    } else {
      router.push("/"); // eslint-disable-line @typescript-eslint/no-floating-promises
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThirdwebProvider activeChain="mumbai">
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default App;
