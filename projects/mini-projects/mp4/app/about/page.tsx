import Header from '@/app/components/Header';

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-6 sm:p-12">
            <Header />
            <div className="w-full max-w-4xl mt-8 bg-gray-900 p-8 rounded shadow-xl border border-gray-700">
                <h1 className="text-3xl font-bold mb-4 text-blue-100">
                    About This Project
                </h1>
                <p className="text-lg text-blue-100">
                    This application is a real-time currency converter built with Next.js.
                    It allows a user to select one of five major world currencies (USD,
                    EUR, JPY, GBP, CNY), enter an amount, and instantly see the
                    converted value in the other four currencies.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-blue-100">
                    API Endpoint & Data Interpretation
                </h2>
                <p className="text-lg text-blue-100 mb-4">
                    This project uses the `currencyfreaks.com` API to get real-time
                    exchange rates.
                </p>
                <ul className="list-disc list-inside space-y-4">
                    <li>
                        <strong className="text-blue-100">Endpoint Used:</strong>
                        <code className="block text-sm bg-gray-800 text-blue-300 p-2 rounded mt-1">
                            https://api.currencyfreaks.com/v2.0/rates/latest
                        </code>
                    </li>
                    <li>
                        <strong className="text-blue-100">API Request:</strong>
                        <p className="text-blue-200">
                            We make a single API call, requesting only the 5 currencies we
                            need:
                            <code className="block text-sm bg-gray-800 text-blue-300 p-2 rounded mt-1">
                                .../latest?apikey=...&symbols=USD,EUR,JPY,GBP,CNY
                            </code>
                        </p>
                    </li>
                    <li>
                        <strong className="text-blue-100">API Response:</strong>
                        <p className="text-blue-200">
                            The API (on its free plan) always returns rates with `USD` as
                            the base currency, like this:
                        </p>
                        <pre className="text-sm bg-gray-800 text-blue-300 p-4 rounded mt-2 overflow-x-auto">
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
                    </li>
                    <li>
                        <strong className="text-blue-100">
                            How the Code Interprets the Data:
                        </strong>
                        <p className="text-blue-200">
                            Since the user can choose any currency (e.g., JPY) as their
                            from currency, then perform the conversion math on our
                            server. The `getConversionRates` function does this in two
                            steps:
                        </p>
                        <ol className="list-decimal list-inside pl-6 mt-2 text-blue-200 space-y-2">
                            <li>
                                <strong>Convert to Base (USD):</strong> It takes the
                                input amount (e.g., 10,000 JPY) and uses the API rate to
                                convert it into USD.
                                <br />
                                <code className="text-sm">
                                    (10,000 JPY / 148.512 JPY-per-USD) = $67.33 USD
                                </code>
                            </li>
                            <li>
                                <strong>Convert to Targets:</strong> It then takes that USD
                                amount ($67.33) and uses the other rates to convert it *into*
                                the final currencies (EUR, GBP, CNY, etc.). This allows for
                                a 1-to-4 conversion with only a single API
                                call.
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
        </main>
    );
}