import "@/styles/globals.css";

// import { ReactScan } from "@/components/react-scan";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <ReactScan /> */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
