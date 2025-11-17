export function isValidUrl(urlString: string): boolean {
    try {
        const url = new URL(urlString);

        // Protocol
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return false;
        }

        // This regex requires at least one dot and a TLD of 2+ characters
        // Rejects: "youtube.c", "localhost", "com"
        // Accepts: "youtube.com", "google.co.uk"
        const hostnameRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return hostnameRegex.test(url.hostname);

    } catch {
        return false;
    }
}