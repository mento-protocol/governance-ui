import '../_globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Header} from "@components/shared";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'MentoLabs | Governance UI',
    description: 'Govern your Mento account with ease.',
}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children,}: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Header/>
        {children}
        </body>
        </html>
    )
}
