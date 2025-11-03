'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full max-w-4xl flex justify-between items-center pb-4 border-b">
            <h1 className="text-3xl font-bold">MP-4 Currency App</h1>
            <nav className="flex gap-4">
                <Link href="/" className="text-blue-600 hover:underline">
                    Home
                </Link>
                <Link href="/about" className="text-blue-600 hover:underline">
                    About
                </Link>
            </nav>
        </header>
    );
}