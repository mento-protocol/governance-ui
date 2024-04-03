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
    <html className={`${inter.variable} font-fg text-lg md:text-xl`} lang="en">
      <body className="bg-white dark:bg-black" suppressHydrationWarning={true}>
        <Providers>
          <ModalProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="mx-auto mt-[50px] w-full max-w-[1120px] flex-1 px-5 md:px-[30px]">
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
