"use client";
import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Footer, Header, Breadcrumbs } from "@/components/_shared";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.scss";
import { Providers } from "@/app/(routes)/providers";
import { usePathname } from "next/navigation";
import { ModalProvider } from "@/lib/providers/modal.provider";

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
    <html className={inter.variable} lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <ModalProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="main-container px-x4 md:px-x6 min-[1178px]:px-0 mt-x10 md:mt-0 flex-1">
                {!homePage && <Breadcrumbs />}
                {children}
              </div>
              <Footer className="pt-x5" />
            </div>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
