"use client";
import '../globals.css';
import {Inter} from 'next/font/google';
import {Footer, Header} from "@components/_shared";
import {WalletProvider} from "@/app/providers/wallet.provider";
import {Breadcrumbs} from "@components/_shared/breadcrumbs/breadcrumbs.component";

const inter = Inter({subsets: ['latin']})

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children,}: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <WalletProvider>
            <div className="main-container min-h-screen px-6 flex flex-col">
                <Header className="py-6"/>
                <Breadcrumbs />
                <div className="py-6 flex-1">
                    {children}
                </div>
                <Footer className="py-6"/>
            </div>
        </WalletProvider>
        </body>
        </html>
    )
}
