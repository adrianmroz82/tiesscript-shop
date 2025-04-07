import "@/styles/globals.css";

import { ReactNode } from "react";

import { SidebarProvider } from "@/components/shadcn-ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

import { AdminSidebar } from "../components/AdminSidebar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <SidebarProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AdminSidebar />
            <main className="w-full">{children}</main>
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
