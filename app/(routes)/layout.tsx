"use client";
import '../globals.css';
import '@/app/brand.scss';
import {Inter} from 'next/font/google';
import {Footer, Header} from "@components/_shared";
import {WalletProvider} from "@/app/providers/wallet.provider";
import {ReactNode} from "react";

const inter = Inter({subsets: ['latin']})

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children,}: RootLayoutProps) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <WalletProvider>
            <div className="main-container min-h-screen flex flex-col">
                <Header/>
                <div className="px-6 flex-1">
                    {children}
                </div>
                <Footer className="pt-6"/>
            </div>
        </WalletProvider>
        </body>
        </html>
    )
}
