import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import Header from "@/app/components/Header";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CS391 URL Shortener",
    description: "A simple URL shortener project for CS391",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} bg-[#ECF4E8] text-gray-800`}
        >
        <Header/>
        {children}
        </body>
        </html>
    );
}