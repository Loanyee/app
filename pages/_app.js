/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import "../styles/globals.css";
import { UserProvider } from "../context/useContext";
import Head from "next/head";
import Script from "next/script";
import Header from "../components/Header";
import { useRouter } from "next/router";
import tabIcon from "../public/favicon.ico";
import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const PushChat = dynamic(() => import("../components/chat"), {
  ssr: false,
});

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai, chain.optimismGoerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// add bootstrap css

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [updatedHeader, setUpdatedHeader] = useState(false);

  useEffect(() => {
    const path = router.pathname;
    if (path == "/" || path == "/borrow" || path == "/borrowerDetail") {
      setUpdatedHeader(true);
    } else {
      setUpdatedHeader(false);
    }
  }, [router.asPath]);

  // change something

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          theme={lightTheme({
            accentColor: "#B786F9",
            accentColorForeground: "white",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
        >
          <Head>
            <title>Loanyee</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header updatedHeader={updatedHeader} />
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
          <PushChat />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
