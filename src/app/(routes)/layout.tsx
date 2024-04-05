"use client";
import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { LearnMore, Header, Breadcrumbs } from "@/components/_shared";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.scss";
import { Providers } from "@/app/(routes)/providers";
import { usePathname } from "next/navigation";
import { ModalProvider } from "@/lib/providers/modal.provider";
import { MaxWidthWrapper } from "@/components/_shared/max-width-wrapper";
import Footer from "@/components/_shared/footer/footer.component";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const path = usePathname();
  const homePage = path === "/";

  return (
    <html
      className={`${inter.variable} w-full font-fg text-lg md:text-xl`}
      lang="en"
    >
      <body
        className="w-full bg-white dark:bg-black"
        suppressHydrationWarning={true}
      >
        <Providers>
          <ModalProvider>
            <Header />
            <MaxWidthWrapper>
              {!homePage && <Breadcrumbs />}
              {children}
            </MaxWidthWrapper>
            <LearnMore className="pt-x5" />
            <Footer />
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
