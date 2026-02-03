import Header from '@/app/components/Header';
import CurrencyConverter from '@/app/components/CurrencyConverter';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center px-5 py-8 sm:px-12 sm:py-16">
            <Header />
            <CurrencyConverter />

            {/* Footer */}
            <footer className="mt-auto pt-16 pb-8 text-center">
                <p className="text-(--text-tertiary) text-[13px]">
                    Real-time exchange rates powered by CurrencyFreaks
                </p>
            </footer>
        </main>
    );
}