import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Titillium_Web } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
      <body className={TitilliumWeb.className}>
        <Navbar />

        <Toaster
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
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
