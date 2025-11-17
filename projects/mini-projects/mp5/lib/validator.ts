export function isValidUrl(urlString: string): boolean {
    const commonTlds = '(com|us|gov|cn|uk|jp|org|net|info|biz|co|io|au|ca|de|fr|in|edu)';

    const urlRegex = new RegExp(
        `^` +
        `(?:https?:\\/\\/)?` + // Optional protocol (e.g., https://)
        `www\\.` + // MANDATORY www.
        `[a-zA-Z0-9-]+\\.` + // Domain name part (e.g., bilibili.)
        `${commonTlds}` + // Mandatory TLD (e.g., com)
        `(?::\\d{2,5})?` + // Optional port number
        `(?:[/?#].*)?` + // Optional path, query, or fragment
        `$`, // End of string
        'i' // Case-insensitive
    );

    return urlRegex.test(urlString.trim());
}