'use client'; // This component MUST be a client component

import { useState } from 'react';
// Import the new server action
import {getConversionRates} from "@/lib/getConversionRate";

// --- Type Definitions ---
// Full names for the dropdown
const currencies = [
    { code: 'USD', name: 'USD - US Dollar' },
    { code: 'EUR', name: 'EUR - Euro' },
    { code: 'JPY', name: 'JPY - Japanese Yen' },
    { code: 'GBP', name: 'GBP - British Pound' },
    { code: 'CNY', name: 'CNY - Chinese Yuan' },
];

// The shape of our result state
type ResultData = {
    from: string;
    inputAmount: number;
    rates: {
        currency: string;
        amount: number;
    }[];
};

// --- Component ---
export default function CurrencyConverter() {
    // Form input states
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');

    // App status states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ResultData | null>(null);

    // --- Form Submission ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setError('Please enter a valid amount greater than 0.');
            setLoading(false);
            return;
        }

        // Call the new Server Action
        const response = await getConversionRates(fromCurrency, amountNum);

        if (response.error) {
            setError(response.error);
        } else if (response.data) {
            setResult(response.data);
        }

        setLoading(false);
    };

    // --- Render ---
    return (
        <div className="w-full max-w-2xl mt-8">
            {/* --- Input Form (Styled like NewPostForm.tsx) --- */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-6 sm:p-8 rounded shadow-xl border border-gray-700"
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Amount Input */}
                    <div className="sm:col-span-1">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-blue-200 mb-2"
                        >
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="100.00"
                            className="w-full rounded border-2 border-gray-700 bg-gray-800 p-3 text-blue-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* From Currency Dropdown (More user-friendly) */}
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="fromCurrency"
                            className="block text-sm font-medium text-blue-200 mb-2"
                        >
                            From Currency
                        </label>
                        <select
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full rounded border-2 border-gray-700 bg-gray-800 p-3 text-blue-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {currencies.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Submit Button (Squared Button) */}
                <button
                    type="submit"
                    disabled={loading}
                    // --- FIX: Combined className onto a single line ---
                    className="w-full rounded mt-6 p-3 text-white font-semibold shadow-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400"
                >
                    {loading ? 'Converting...' : 'Convert'}
                </button>
            </form>

            {/* --- Result and Error Display --- */}
            <div className="mt-8">
                {/* Error Box */}
                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
                        <strong className="font-bold">Error: </strong>
                        <span>{error}</span>
                    </div>
                )}

                {/* Results Grid (User-friendly 1-to-4 layout) */}
                {result && (
                    <div className="bg-gray-900 p-6 rounded shadow-xl border border-gray-700">
                        <h2 className="text-xl font-semibold text-blue-100 mb-4">
                            {result.inputAmount.toLocaleString()} {result.from} converts to:
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {result.rates.map((rate) => (
                                <div
                                    key={rate.currency}
                                    className="bg-gray-800 p-4 rounded border border-gray-700"
                                >
                  <span className="text-sm text-blue-300">
                    {rate.currency}
                  </span>
                                    <p className="text-2xl font-bold text-blue-50">
                                        {rate.amount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 4,
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}