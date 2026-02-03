import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Currency Converter | Real-time Exchange Rates',
    description: 'Convert between major world currencies with real-time exchange rates. Simple, fast, and accurate currency conversion.',
    keywords: ['currency converter', 'exchange rates', 'USD', 'EUR', 'JPY', 'GBP', 'CNY'],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className={`${inter.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}