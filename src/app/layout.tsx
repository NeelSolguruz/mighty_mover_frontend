import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import { Titillium_Web } from "next/font/google";
import { Provider } from "react-redux";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
const TitilliumWeb = Titillium_Web({
  weight: ["400", "600", "700", "900", "200", "300"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mighty Movers",
  description: "Created by 3 fresh developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Mighty_Movers.svg" sizes="any" />
      </head>
      <body className={TitilliumWeb.className}>
        <StoreProvider>
          {/* <Toaster
            duration={2000}
            richColors
            position="top-right"
            toastOptions={{
              style: {
                // background: "red",
                // zIndex: 100,
                // width:"250px",
              },
            }}
          /> */}
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
