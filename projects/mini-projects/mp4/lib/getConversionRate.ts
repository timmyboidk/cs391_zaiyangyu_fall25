'use server';

const API_KEY = process.env.CURRENCYFREAKS_API_KEY;
const API_BASE_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest';
const ALL_CURRENCIES = ['USD', 'CNY', 'JPY', 'GBP', 'EUR'];

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
    };
    error?: string;
}

//  fetches rates for all currencies and performs math on the server.

export async function getConversionRates(
    fromCurrency: string,
    amount: number
): Promise<ConversionResult> {
    if (!API_KEY) {
        return { error: 'API key is not configured on the server.' };
    }

    const symbols = ALL_CURRENCIES.join(',');
    const apiURL = `${API_BASE_URL}?apikey=${API_KEY}&symbols=${symbols}`;

    try {
        const res = await fetch(apiURL);
        if (!res.ok) {
            throw new Error(`API Network Error: ${res.statusText}`);
        }

        const data: CurrencyFreaksResponse = await res.json();
        if (!data.rates) {
            // Handle API errors (e.g., invalid key, usage limit)
            // @ts-expect-error - Check for API's error message
            throw new Error(data.message || 'Failed to fetch rates from API.');
        }

        // The API returns all rates as strings
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

        //convert the user's input amount to  base (USD)
        const amountInUSD = amount / fromRate;

        // Determine which 4 currencies need to convert
        const toCurrencies = ALL_CURRENCIES.filter((c) => c !== fromCurrency);

        // convert that USD amount to the other 4 currencies
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