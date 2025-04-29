import "@/styles/globals.css";

import { Raleway } from "next/font/google";
import { ReactNode } from "react";

import { Header } from "@/components/header";
import { Toaster } from "@/components/shadcn-ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/store/store-provider";

const raleway = Raleway({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning className={raleway.className}>
      <head />
      <body className="flex">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StoreProvider>
            <div className="flex flex-col w-full">
              <Header />
              <main className="flex w-full flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 ">{children}</main>
            </div>
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
