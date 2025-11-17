import Link from "next/link";

export default function Header() {
    const linkstyling = "p-1 m-2 text-xl hover:underline text-[#93BFC7]";
    return (
        <header className="flex justify-between items-center h-20 w-full max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-semibold p-4 text-[#93BFC7]">
                CS391 URL Shortener
            </h2>
            <nav className="p-2 m-4">
                <Link href="/" className={linkstyling}>Home</Link>
            </nav>
        </header>
    );
}