'use server';

interface AmdorenSuccess {
    error: 0;
    error_message: string;
    amount: number;
}

interface AmdorenError {
    error: number;
    error_message: string;
}

interface ConversionResult {
    data?: {
        from: string;
        to: string;
        inputAmount: number;
        convertedAmount: number;
    };
    error?: string;
}

export async function getConversionRate(
    fromCurrency: string,
    toCurrency: string,
    amount: number
): Promise<ConversionResult> {
    const apiKey = process.env.AMDOREN_API_KEY;

    if (!apiKey) {
        return {error: 'API key is not configured on the server.'};
    }

    const apiURL = `https://www.amdoren.com/api/currency.php?api_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

    try {
        const res = await fetch(apiURL);
        const data: AmdorenSuccess | AmdorenError = await res.json();

        if (data.error > 0) {
            return {error: `API Error: ${data.error_message}`};
        }

        const successData = data as AmdorenSuccess;
        return {
            data: {
                from: fromCurrency,
                to: toCurrency,
                inputAmount: amount,
                convertedAmount: successData.amount,
            },
        };
    } catch (e) {
        console.error(e);
        return {error: 'Failed to fetch data. The API might be down.'};
    }
}