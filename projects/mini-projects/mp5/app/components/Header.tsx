import Link from "next/link";

export default function Header() {
    const linkstyling = "p-1 m-2 text-xl hover:underline";
    return (
        <header className="flex  justify-between items-center h-20">
            <h2 className="text-4xl font-semibold p-4">CS391 URL Shortener</h2>
            <nav className="p-2 m-4">
                <Link href="/" className={linkstyling}>Home</Link>
            </nav>
        </header>
    );
}