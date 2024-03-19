"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { Providers } from "@/app/(routes)/providers";
import { ModalProvider } from "@/lib/providers/modal.provider";
import { Footer, Header, Breadcrumbs } from "@/components/_shared";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const path = usePathname();
  const homePage = path === "/";

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
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
