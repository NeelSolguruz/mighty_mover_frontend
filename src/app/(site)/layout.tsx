import type { Metadata } from "next";
// import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

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
      <body>
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
