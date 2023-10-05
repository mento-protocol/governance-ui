"use client";
import '../_globals.css';
import {Inter} from 'next/font/google';
import {Header} from "@components/shared";

const inter = Inter({subsets: ['latin']})
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children,}: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="main-container min-h-screen px-6">
            <Header/>
            {children}
        </div>
        </body>
        </html>
    )
}
