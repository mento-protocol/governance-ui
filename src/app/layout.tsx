import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import {
  LearnMore,
  Breadcrumbs,
  MaxWidthWrapper,
  Toaster,
  Footer,
  Header,
} from "@/components/_shared";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import { Providers } from "@/app/providers";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Mento Governance",
  description: "Mento governance platform.",
  openGraph: {
    url: "https://governance.mento.org",
    type: "website",
    title: "Mento Governance",
    description: "Mento governance platform.",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={`${inter.variable} w-full overscroll-none`} lang="en">
      <body
        className="w-full overscroll-none bg-white font-fg text-base antialiased [background-image:radial-gradient(circle_at_calc(100%+210px)_37.5%,_#4D62F0_0%,_transparent_540px),radial-gradient(circle_at_calc(0%-210px)_75%,_#4D62F0_0%,_transparent_540px)] [background-origin:border-box,_border-box] [background-position:_0_0,_0_0] [background-repeat:_repeat] [background-size:_100vw_200vh] dark:bg-black"
        suppressHydrationWarning={true}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <MaxWidthWrapper>
              <Breadcrumbs />
              {children}
            </MaxWidthWrapper>
            <LearnMore className="pt-[25px]" />
            <Footer />
            <Toaster />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
