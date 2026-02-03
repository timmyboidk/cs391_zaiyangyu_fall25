'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="w-full max-w-4xl">
            {/* Apple-style navigation bar */}
            <nav className="flex justify-between items-center py-4 px-2">
                {/* Logo / Brand */}
                <Link href="/" className="group flex items-center gap-3">
                    {/* Currency icon with gradient */}
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#D5C7A3] to-[#BDB395] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v12" />
                            <path d="M15 9.5c-.5-1-1.5-1.5-3-1.5s-2.5.5-3 1.5c-.5 1 .5 2 3 2.5s3.5 1.5 3 2.5c-.5 1-1.5 1.5-3 1.5s-2.5-.5-3-1.5" />
                        </svg>
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-(--text-primary) hidden sm:block">
                        Currency Converter
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <Link
                        href="/"
                        className={`px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-300 ${pathname === '/'
                                ? 'bg-[#BDB395]/20 text-(--text-primary)'
                                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-[#BDB395]/10'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-300 ${pathname === '/about'
                                ? 'bg-[#BDB395]/20 text-(--text-primary)'
                                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-[#BDB395]/10'
                            }`}
                    >
                        About
                    </Link>
                </div>
            </nav>

            {/* Subtle divider line with gradient */}
            <div className="h-px bg-linear-to-r from-transparent via-[#D5C7A3]/50 to-transparent" />
        </header>
    );
}