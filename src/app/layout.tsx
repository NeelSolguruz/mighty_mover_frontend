import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Titillium_Web } from "next/font/google";

const TitilliumWeb = Titillium_Web({
  weight: ["400","600","700","900","200","300"],
  subsets: ["latin"],
  display: "swap",
});
// const inter = Inter({ subsets: ["latin"] });

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
