import type { Metadata } from "next";
// import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";



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
                {children}
                <Footer />
            </body>
        </html>
    );
}
