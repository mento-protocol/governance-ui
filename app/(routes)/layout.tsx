"use client";
import '../globals.scss';
import '@/app/brand.scss';
import '@rainbow-me/rainbowkit/styles.css';
import {Inter} from 'next/font/google';
import {Footer, Header, Breadcrumbs} from "@components/_shared";
import React, {ReactNode} from "react";
import {Providers} from "@/app/(routes)/providers";
import {ModalProvider} from "@/app/providers/modal.provider";
import {usePathname} from 'next/navigation';

const inter = Inter({subsets: ['latin']})

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    const path = usePathname();
    const homePage = path === '/';

    return (
            <html lang="en">
            <body className={inter.className}>
            <Providers>
                <ModalProvider>
                    <div className="min-h-screen flex flex-col">
                        <Header/>
                        <div className="main-container px-6 min-[1160px]:px-0 mt-x5 md:mt-0 flex-1">
                            {!homePage && <Breadcrumbs/>}
                            {children}
                        </div>
                        <Footer className="pt-6"/>
                    </div>
                </ModalProvider>
            </Providers>
            </body>
            </html>
    )
}
