import "@/styles/reset.css";
import "@/styles/globals.css";
import "@/styles/style.css";

import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { ProjectProvider } from "@/lib/context/ProjectsContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { PointProvider } from "@/lib/context/PointContext";
import { NFTProvider } from "@/lib/context/NFTContext";
import { UserProvider } from "@/lib/context/UserContext";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }) {
    const config = getDefaultConfig({
        appName: 'Droppod',
        projectId: '7f53a384c8af77150b1d37c11a864491',
        chains: [mainnet],
        ssr: false, // If your dApp uses server side rendering (SSR)
        autoConnect: true,
    });

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider locale="en-US " modalSize="compact" theme={darkTheme()}>
                    <Header />
                    <ProjectProvider>
                        <AuthProvider>
                            <PointProvider>
                                <NFTProvider>
                                    <UserProvider>
                                        <Component {...pageProps} />
                                        <Footer />
                                    </UserProvider>
                                </NFTProvider>
                            </PointProvider>
                        </AuthProvider>
                    </ProjectProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}