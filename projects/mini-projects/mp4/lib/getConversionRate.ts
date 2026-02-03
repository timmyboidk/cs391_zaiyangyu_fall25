'use server';

const API_KEY = process.env.CURRENCYFREAKS_API_KEY;
const API_BASE_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest';

// Expanded list: Fiat currencies + Cryptocurrencies
const ALL_CURRENCIES = [
    // Major Fiat Currencies
    'USD', 'EUR', 'JPY', 'GBP', 'CNY',
    'AUD', 'CAD', 'CHF', 'HKD', 'SGD',
    'KRW', 'INR', 'MXN', 'BRL', 'NZD',
    'SEK', 'NOK', 'THB', 'ZAR', 'RUB',
    // Major Cryptocurrencies
    'BTC', 'ETH', 'USDT', 'BNB', 'XRP',
    'ADA', 'DOGE', 'SOL', 'MATIC', 'DOT'
];

interface CurrencyFreaksResponse {
    date: string;
    base: 'USD';
    rates: {
        [key: string]: string; // The API returns rates as strings
    };
}

interface Rate {
    currency: string;
    amount: number;
}

interface ConversionResult {
    data?: {
        from: string;
        inputAmount: number;
        rates: Rate[];
        lastUpdated?: string;
    };
    error?: string;
}

/**
 * Fetches real-time exchange rates from CurrencyFreaks API and performs
 * currency conversion on the server side.
 * 
 * Supports both fiat currencies and cryptocurrencies (BTC, ETH, etc.)
 * 
 * The API returns all rates relative to USD, so we:
 * 1. Convert the input amount to USD (divide by source currency rate)
 * 2. Convert from USD to all target currencies (multiply by target rate)
 */
export async function getConversionRates(
    fromCurrency: string,
    amount: number
): Promise<ConversionResult> {
    // Input validation to prevent abuse and invalid requests
    if (!API_KEY) {
        return { error: 'API key is not configured on the server.' };
    }

    // Validate currency code format (3-5 uppercase letters/numbers)
    if (!fromCurrency || !/^[A-Z0-9]{3,5}$/.test(fromCurrency)) {
        return { error: 'Invalid currency code format.' };
    }

    // Validate amount is a positive number within reasonable bounds
    if (!amount || isNaN(amount) || amount <= 0 || amount > 1e15) {
        return { error: 'Invalid amount. Must be a positive number.' };
    }

    const symbols = ALL_CURRENCIES.join(',');
    const apiURL = `${API_BASE_URL}?apikey=${API_KEY}&symbols=${symbols}`;

    try {
        const res = await fetch(apiURL, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!res.ok) {
            throw new Error(`API Network Error: ${res.statusText}`);
        }

        const data: CurrencyFreaksResponse = await res.json();

        if (!data.rates) {
            // Handle API errors (e.g., invalid key, usage limit)
            // @ts-expect-error - Check for API's error message
            throw new Error(data.message || 'Failed to fetch rates from API.');
        }

        // Parse all rates from strings to numbers
        const rates: { [key: string]: number } = {};
        for (const key in data.rates) {
            rates[key] = parseFloat(data.rates[key]);
            if (isNaN(rates[key])) {
                throw new Error(`Invalid rate received from API for currency: ${key}`);
            }
        }

        // Get the rate of the user's "from" currency (relative to USD)
        const fromRate = rates[fromCurrency];
        if (!fromRate || fromRate === 0) {
            throw new Error(`Could not find a valid rate for ${fromCurrency}`);
        }

        // Convert the user's input amount to base (USD)
        const amountInUSD = amount / fromRate;

        // Determine which currencies to convert to (all except the source)
        const toCurrencies = ALL_CURRENCIES.filter((c) => c !== fromCurrency);

        // Convert USD amount to all target currencies
        const successfulRates: Rate[] = toCurrencies.map((toCurrency) => {
            const toRate = rates[toCurrency];
            const convertedAmount = amountInUSD * toRate;

            return {
                currency: toCurrency,
                amount: convertedAmount,
            };
        });

        return {
            data: {
                from: fromCurrency,
                inputAmount: amount,
                rates: successfulRates,
                lastUpdated: data.date,
            },
        };

    } catch (e: unknown) {
        console.error(e);
        let errorMessage = 'Failed to fetch data. Please try again.';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        return { error: errorMessage };
    }
}

/**
 * Get the list of supported currencies (fiat + crypto)
 */
export async function getSupportedCurrencies(): Promise<string[]> {
    return ALL_CURRENCIES;
}