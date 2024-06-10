import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import {
  LearnMore,
  Header,
  Breadcrumbs,
  Footer,
  MaxWidthWrapper,
  Toaster,
} from "@/components/_shared";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.scss";
import { Providers } from "@/app/providers";
import { cn } from "@/styles/helpers";
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
        className={cn(
          "w-full overscroll-none bg-white font-fg text-base antialiased dark:bg-black",
          "[background-origin:border-box,_border-box]",
          "[background-position:_0_0,_0_0]",
          "[background-repeat:_repeat]",
          "[background-size:_100vw_200vh]",
          "[background-image:radial-gradient(circle_at_calc(100%+210px)_37.5%,_#4D62F0_0%,_transparent_540px),radial-gradient(circle_at_calc(0%-210px)_75%,_#4D62F0_0%,_transparent_540px)]",
        )}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Header />
          <MaxWidthWrapper>
            <Breadcrumbs />
            {children}
          </MaxWidthWrapper>
          <LearnMore className="pt-x5" />
          <Footer />
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
