"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { monadTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [monadTestnet],
    transports: {
      // RPC URL for each chain
      [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0]),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "DoitNad",

    // Optional App Info
    appDescription: "Do it Nad",
    appUrl: "", // your app's url
    appIcon: "", // your app's icon, no bigger than 1024x1024px (max. 1MB)

    hideBalance: false,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-connectbutton-color": "#382b22",
            "--ck-connectbutton-background": "#fff0f0",
            "--ck-connectbutton-box-shadow":  "-4px 4px 0px rgba(177, 133, 151, 0.5),inset 0 0 0 2px #b18597",
            "--ck-primary-button-box-shadow": "-4px 4px 0px rgba(177, 133, 151, 0.5),inset 0 0 0 2px #b18597",
            "--ck-secondary-button-box-shadow":  "-4px 4px 0px rgba(177, 133, 151, 0.5),inset 0 0 0 2px #b18597",
            "--ck-tertiary-button-box-shadow": "-4px 4px 0px rgba(177, 133, 151, 0.5),inset 0 0 0 2px #b18597",
            "--ck-body-background" : "#fff0f0",
            "--ck-modal-box-shadow": "-10px 10px 0px #b18597, inset 0 0 0 2px #b18597"
          }}
          theme="retro"
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
