"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/shadcn-ui/toaster";
import { AuthProvider } from "./context/auth-provider";

import "./globals.css";

// export const metadata: Metadata = {
//   title: "Tiesscript",
//   description: "Vintage ties shop",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Header />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
