import UrlShortenerForm from "@/app/components/UrlShortenerForm";

export default async function Home() {
    return (
        <main className="flex flex-col items-center justify-center p-4 pt-16 md:pt-24">
            <UrlShortenerForm/>
        </main>
    );
}