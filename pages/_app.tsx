import "@/styles/globals.css";
import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { MetaMaskProvider } from "metamask-react";
// import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
export default function App({ Component, pageProps }: AppProps) {
  // Put the ethereum chain ids of the chains you want to support
  // const supportedChainIds = [1, 4, 5, 56, 97, 137];
  // const connectors = {
  //   injected: {},
  //   magic: {
  //     apiKey: "pk_...", // Your magic api key
  //     chainId: 1, // The chain ID you want to allow on magic
  //   },
  //   walletconnect: {},
  //   walletlink: {
  //     appName: "thirdweb - demo",
  //     url: "https://thirdweb.com",
  //     darkMode: false,
  //   },
  // };
  return (
    // <ThirdwebWeb3Provider
    //   supportedChainIds={supportedChainIds}
    //   connectors={connectors}
    // >
    <MetaMaskProvider>
      <Component {...pageProps} />
    </MetaMaskProvider>
    // </ThirdwebWeb3Provider>
  );
}
