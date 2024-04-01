import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; 
import Navbar from "@/components/Navbar";
import { Montserrat } from "next/font/google";

const TitilliumWeb = Montserrat({
  weight: "400",
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
