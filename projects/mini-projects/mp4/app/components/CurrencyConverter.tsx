'use client';

import { useState } from 'react';
import { getConversionRate } from '../../lib/getConversionRate';

type ResultData = {
    from: string;
    to: string;
    inputAmount: number;
    convertedAmount: number;
};

export default function CurrencyConverter() {
    const [amount, setAmount] = useState('1');
    const [toCurrency, setToCurrency] = useState('EUR');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ResultData | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        const amountNum = parseFloat(amount);

        const response = await getConversionRate(
            'USD',
            toCurrency.toUpperCase(),
            amountNum
        );

        if (response.error) {
            setError(response.error);
        }
        else if (response.data) {
            setResult(response.data);
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-md mt-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Amount in USD
                    </label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black p-2"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="toCurrency"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Convert To (e.g., EUR, JPY)
                    </label>
                    <input
                        id="toCurrency"
                        type="text"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Converting...' : 'Convert'}
                </button>
            </form>

            {/* --- Result and Error Display --- */}
            <div className="mt-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                        <strong className="font-bold">Error: </strong>
                        <span>{error}</span>
                    </div>
                )}
                {result && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
                        <strong className="font-bold">Result:</strong>
                        <p className="text-lg">
                            {result.inputAmount} {result.from} ={' '}
                            {result.convertedAmount.toFixed(4)} {result.to}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}