"use client";

import { ReactNode } from "react";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/shadcn-ui/toaster";
import { AuthProvider } from "./context/auth-provider";
import { Sidebar } from "@/components/sidebar";

import "./globals.css";

const satoshiFont = localFont({ src: "../public/fonts/satoshi-light.otf" });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${satoshiFont.className}`}>
      <head />
      <body className="flex">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col w-full h-full">
              <Header />
              <div className="flex flex-row w-full h-full">
                <Sidebar />
                <main className="w-full h-full">{children}</main>
              </div>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
