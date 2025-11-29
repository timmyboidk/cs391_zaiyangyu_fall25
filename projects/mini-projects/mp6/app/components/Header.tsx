import Link from "next/link";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
            <Link href="/"
                  className="text-3xl font-bold text-[#000000] tracking-tight hover:opacity-80 transition pointer-events-auto">
                CS391 OAuth
            </Link>
            <Link href="/about"
                  className="text-[#4A70A9] font-semibold hover:text-[#8FABD4] transition pointer-events-auto">
                About
            </Link>
        </header>
    );
}