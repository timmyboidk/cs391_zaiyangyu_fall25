'use client';

import { useState, useMemo } from 'react';
import { getConversionRates } from "@/lib/getConversionRate";
import { CURRENCIES, getCurrencyInfo } from "@/lib/currencyData";

type ResultData = {
    from: string;
    inputAmount: number;
    rates: {
        currency: string;
        amount: number;
    }[];
    lastUpdated?: string;
};

type CategoryFilter = 'all' | 'fiat' | 'crypto';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ResultData | null>(null);

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

        const response = await getConversionRates(fromCurrency, amountNum);

        if (response.error) {
            setError(response.error);
        } else if (response.data) {
            setResult(response.data);
        }

        setLoading(false);
    };

    const currentCurrency = getCurrencyInfo(fromCurrency);

    // Filter currencies based on selected category - memoized to prevent unnecessary recalculations
    const filteredCurrencies = useMemo(() => {
        if (categoryFilter === 'all') return CURRENCIES;
        return CURRENCIES.filter(c => c.type === categoryFilter);
    }, [categoryFilter]);

    // Filter results based on category - memoized to prevent unnecessary recalculations
    const filteredResults = useMemo(() => {
        if (!result?.rates) return [];
        if (categoryFilter === 'all') return result.rates;
        return result.rates.filter(rate => {
            const currencyInfo = getCurrencyInfo(rate.currency);
            return currencyInfo.type === categoryFilter;
        });
    }, [result?.rates, categoryFilter]);

    return (
        <div className="w-full max-w-2xl mt-10 animate-fade-in-up">
            {/* Main Card */}
            <div className="card-apple">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                        Convert Currency
                    </h2>
                    <p className="text-(--text-secondary) text-[15px]">
                        Real-time rates for {CURRENCIES.length} currencies & crypto
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Amount Input */}
                        <div className="space-y-2">
                            <label htmlFor="amount" className="label-apple">
                                Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-tertiary) font-medium text-[15px] pointer-events-none select-none w-6 text-center">
                                    {currentCurrency.symbol}
                                </span>
                                <input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="input-apple pl-12!"
                                    step="any"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Currency Select */}
                        <div className="space-y-2">
                            <label htmlFor="fromCurrency" className="label-apple">
                                From Currency
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none select-none">
                                    {currentCurrency.flag}
                                </span>
                                <select
                                    id="fromCurrency"
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    className="select-apple pl-14!"
                                >
                                    <optgroup label="Fiat Currencies">
                                        {CURRENCIES.filter(c => c.type === 'fiat').map((c) => (
                                            <option key={c.code} value={c.code}>
                                                {c.code} — {c.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Cryptocurrencies">
                                        {CURRENCIES.filter(c => c.type === 'crypto').map((c) => (
                                            <option key={c.code} value={c.code}>
                                                {c.code} — {c.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Convert Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-apple btn-primary w-full mt-8 text-[17px]"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <span className="spinner" />
                                Converting...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                Convert to All Currencies
                            </span>
                        )}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div className="mt-8">
                {/* Error Message */}
                {error ? (
                    <div className="error-box animate-fade-in-up flex items-start gap-3">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                ) : null}

                {/* Success Results */}
                {result ? (
                    <div className="card-apple animate-fade-in-up">
                        {/* Results Header */}
                        <div className="text-center mb-6 pb-6 border-b border-(--card-border)">
                            <p className="text-(--text-secondary) text-[13px] uppercase tracking-wider font-semibold mb-2">
                                Converting From
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-3xl">{getCurrencyInfo(result.from).flag}</span>
                                <div className="text-left">
                                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight block">
                                        {getCurrencyInfo(result.from).symbol}{result.inputAmount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                    <span className="text-(--text-secondary) text-sm">
                                        {getCurrencyInfo(result.from).name}
                                    </span>
                                </div>
                            </div>
                            {result.lastUpdated && (
                                <p className="text-(--text-tertiary) text-xs mt-3">
                                    Rates as of {new Date(result.lastUpdated).toLocaleString()}
                                </p>
                            )}
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <button
                                onClick={() => setCategoryFilter('all')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${categoryFilter === 'all'
                                    ? 'bg-[#BDB395]/20 text-(--text-primary)'
                                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-[#BDB395]/10'
                                    }`}
                            >
                                All ({result.rates.length})
                            </button>
                            <button
                                onClick={() => setCategoryFilter('fiat')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${categoryFilter === 'fiat'
                                    ? 'bg-[#BDB395]/20 text-(--text-primary)'
                                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-[#BDB395]/10'
                                    }`}
                            >
                                💵 Fiat ({result.rates.filter(r => getCurrencyInfo(r.currency).type === 'fiat').length})
                            </button>
                            <button
                                onClick={() => setCategoryFilter('crypto')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${categoryFilter === 'crypto'
                                    ? 'bg-[#BDB395]/20 text-(--text-primary)'
                                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-[#BDB395]/10'
                                    }`}
                            >
                                ₿ Crypto ({result.rates.filter(r => getCurrencyInfo(r.currency).type === 'crypto').length})
                            </button>
                        </div>

                        {/* Section Title */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-(--text-secondary) text-[13px] uppercase tracking-wider font-semibold">
                                Converted To ({filteredResults?.length || 0} {categoryFilter === 'all' ? 'currencies' : categoryFilter})
                            </h3>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredResults?.map((rate, index) => {
                                const currencyInfo = getCurrencyInfo(rate.currency);
                                const isCrypto = currencyInfo.type === 'crypto';
                                return (
                                    <div
                                        key={rate.currency}
                                        className={`result-card animate-fade-in-up stagger-${Math.min(index + 1, 4)} ${isCrypto ? 'bg-linear-to-br from-[#F2E2B1]/30 to-[#D5C7A3]/20' : ''
                                            }`}
                                        style={{ opacity: 0, animationDelay: `${index * 0.08}s` }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl shrink-0">{currencyInfo.flag}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline justify-between gap-2">
                                                    <p className="text-(--text-tertiary) text-[12px] font-semibold tracking-wider">
                                                        {rate.currency}
                                                    </p>
                                                    <p className="text-xl font-semibold tracking-tight truncate">
                                                        {currencyInfo.symbol}{rate.amount.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: rate.amount < 1 ? 8 : 2,
                                                        })}
                                                    </p>
                                                </div>
                                                <p className="text-(--text-secondary) text-[13px] truncate">
                                                    {currencyInfo.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}