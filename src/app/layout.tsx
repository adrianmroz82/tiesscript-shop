import { ReactNode } from "react";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/shadcn-ui/toaster";

import "@/styles/globals.css";

const satoshiFont = localFont({ src: "../../public/fonts/satoshi-light.otf" });

interface Props {
  children: ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning className={`${satoshiFont.className}`}>
      <head />
      <body className="flex">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col w-full">
            <Header />
            <main className="w-full min-h-full">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
