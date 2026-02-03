import Header from '@/app/components/Header';

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-5 py-8 sm:px-12 sm:py-16">
            <Header />

            {/* Hero Section */}
            <div className="w-full max-w-4xl mt-12 animate-fade-in-up">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                        About This Project
                    </h1>
                    <p className="text-(--text-secondary) text-lg max-w-2xl mx-auto leading-relaxed">
                        A modern currency converter built with Next.js, featuring real-time
                        exchange rates and an Apple-inspired design.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    <div className="card-apple text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-linear-to-br from-[#D5C7A3] to-[#BDB395] flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Real-time Rates</h3>
                        <p className="text-(--text-secondary) text-[15px]">
                            Live exchange rates updated continuously from reliable sources
                        </p>
                    </div>
                    <div className="card-apple text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-linear-to-br from-[#F2E2B1] to-[#D5C7A3] flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">30 Currencies & Crypto</h3>
                        <p className="text-(--text-secondary) text-[15px]">
                            20 fiat currencies + 10 cryptocurrencies including BTC, ETH, and more
                        </p>
                    </div>
                </div>

                {/* Technical Details */}
                <div className="card-apple">
                    <h2 className="text-2xl font-semibold tracking-tight mb-6">
                        How It Works
                    </h2>

                    <div className="space-y-8">
                        {/* API Endpoint */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#BDB395]/20 flex items-center justify-center text-sm font-bold text-[#BDB395]">1</span>
                                API Source
                            </h3>
                            <p className="text-(--text-secondary) mb-3 leading-relaxed">
                                This project uses the CurrencyFreaks API to fetch real-time exchange rates.
                            </p>
                            <code className="code-block block">
                                https://api.currencyfreaks.com/v2.0/rates/latest
                            </code>
                        </div>

                        <div className="divider" />

                        {/* Request Format */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#BDB395]/20 flex items-center justify-center text-sm font-bold text-[#BDB395]">2</span>
                                API Request
                            </h3>
                            <p className="text-(--text-secondary) mb-3 leading-relaxed">
                                A single API call fetches rates for all 30 currencies (fiat + crypto):
                            </p>
                            <code className="code-block block">
                                .../latest?apikey=...&symbols=USD,EUR,JPY,...,BTC,ETH,USDT
                            </code>
                        </div>

                        <div className="divider" />

                        {/* Response Format */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#BDB395]/20 flex items-center justify-center text-sm font-bold text-[#BDB395]">3</span>
                                API Response
                            </h3>
                            <p className="text-(--text-secondary) mb-3 leading-relaxed">
                                The API returns rates with USD as the base currency:
                            </p>
                            <pre className="code-block overflow-x-auto">
                                {`{
  "base": "USD",
  "rates": {
    "EUR": "0.92786...",
    "GBP": "0.81727...",
    "JPY": "148.512...",
    "CNY": "7.21801...",
    "USD": "1.0"
  }
}`}
                            </pre>
                        </div>

                        <div className="divider" />

                        {/* Conversion Logic */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#BDB395]/20 flex items-center justify-center text-sm font-bold text-[#BDB395]">4</span>
                                Conversion Logic
                            </h3>
                            <p className="text-(--text-secondary) mb-4 leading-relaxed">
                                The conversion happens in two steps on the server:
                            </p>
                            <div className="space-y-4">
                                <div className="result-card">
                                    <p className="font-medium mb-2">Step 1: Convert to Base (USD)</p>
                                    <p className="text-(--text-secondary) text-[15px]">
                                        Input amount is first converted to USD using the source currency rate.
                                    </p>
                                    <code className="code-block block mt-2 text-sm">
                                        10,000 JPY ÷ 148.512 = $67.33 USD
                                    </code>
                                </div>
                                <div className="result-card">
                                    <p className="font-medium mb-2">Step 2: Convert to Target Currencies</p>
                                    <p className="text-(--text-secondary) text-[15px]">
                                        The USD amount is then multiplied by each target currency rate.
                                    </p>
                                    <code className="code-block block mt-2 text-sm">
                                        $67.33 × 0.92786 = €62.47 EUR
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto pt-16 pb-8 text-center">
                <p className="text-(--text-tertiary) text-[13px]">
                    Built with Next.js • Powered by CurrencyFreaks API
                </p>
            </footer>
        </main>
    );
}