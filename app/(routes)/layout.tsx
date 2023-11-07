"use client";
import '../globals.css';
import '@/app/brand.scss';
import '@rainbow-me/rainbowkit/styles.css';
import {Inter} from 'next/font/google';
import {Footer, Header} from "@components/_shared";
import React, {ReactNode} from "react";
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {Alfajores, Baklava, Celo} from '@celo/rainbowkit-celo/chains'
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc'
import {connectorsForWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {getWalletConnectors} from "@/app/helpers/wallet";


const inter = Inter({subsets: ['latin']})

const {chains, publicClient} = configureChains(
    [Alfajores, Baklava, Celo],
    [
        jsonRpcProvider({rpc: (chain) => ({http: chain.rpcUrls.default.http[0]})})
    ]
);

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended for Celo chains',
        wallets: getWalletConnectors(chains),
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})


interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children,}: RootLayoutProps) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <div className="min-h-screen flex flex-col">
                    <Header/>
                    <div className="main-container px-6 mt-32 md:mt-0 flex-1">
                        {children}
                    </div>
                    <Footer className="pt-6"/>
                </div>
            </RainbowKitProvider>
        </WagmiConfig>
        </body>
        </html>
    )
}
