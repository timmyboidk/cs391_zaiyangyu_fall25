import Link from "next/link";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full p-8">
            <Link href="/" className="text-3xl font-bold text-[#000000] tracking-tight">
                CS391 OAuth
            </Link>
        </header>
    );
}