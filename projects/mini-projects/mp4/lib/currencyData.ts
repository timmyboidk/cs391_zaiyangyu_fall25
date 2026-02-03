// Currency metadata with crypto support
// Extracted to separate file for better tree-shaking and bundle optimization
export const CURRENCIES = [
    // Fiat Currencies
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', type: 'fiat' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', type: 'fiat' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', type: 'fiat' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', type: 'fiat' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', type: 'fiat' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', type: 'fiat' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', type: 'fiat' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', type: 'fiat' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', type: 'fiat' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', type: 'fiat' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', type: 'fiat' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', type: 'fiat' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', type: 'fiat' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', type: 'fiat' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', type: 'fiat' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', type: 'fiat' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', type: 'fiat' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', type: 'fiat' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', type: 'fiat' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', type: 'fiat' },
    // Cryptocurrencies
    { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '₿', type: 'crypto' },
    { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: '⟠', type: 'crypto' },
    { code: 'USDT', name: 'Tether', symbol: '₮', flag: '₮', type: 'crypto' },
    { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', flag: '🔶', type: 'crypto' },
    { code: 'XRP', name: 'Ripple', symbol: 'XRP', flag: '◎', type: 'crypto' },
    { code: 'ADA', name: 'Cardano', symbol: '₳', flag: '₳', type: 'crypto' },
    { code: 'DOGE', name: 'Dogecoin', symbol: 'Ð', flag: '🐕', type: 'crypto' },
    { code: 'SOL', name: 'Solana', symbol: 'SOL', flag: '◎', type: 'crypto' },
    { code: 'MATIC', name: 'Polygon', symbol: 'MATIC', flag: '⬡', type: 'crypto' },
    { code: 'DOT', name: 'Polkadot', symbol: 'DOT', flag: '●', type: 'crypto' },
] as const;

export type CurrencyType = 'fiat' | 'crypto';

export interface Currency {
    code: string;
    name: string;
    symbol: string;
    flag: string;
    type: CurrencyType;
}

// Helper function to get currency info by code
// Moved outside component to prevent recreation on every render
export const getCurrencyInfo = (code: string): Currency => {
    return CURRENCIES.find(c => c.code === code) || {
        code,
        name: code,
        symbol: '',
        flag: '🌐',
        type: 'fiat' as const
    };
};
