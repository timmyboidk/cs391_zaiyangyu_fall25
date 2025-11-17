export function isValidUrl(urlString: string): boolean {
    // Regex Explanation:
    // ^                        : Start of string
    // (?:https?:\/\/)?         : Optional Protocol (http:// or https://)
    // (?:www\.)?               : Optional www.
    // [a-zA-Z0-9-]+            : Main Domain Name (e.g. github)
    // (?:\.[a-zA-Z0-9-]+)* : Optional Subdomains (e.g. .api in api.github)
    // \.[a-zA-Z]{2,}           : Mandatory TLD (e.g. .com, .io, .org, .cn) - Must be at least 2 letters
    // (?::\d{2,5})?            : Optional Port (e.g. :3000)
    // (?:[/?#].*)?             : Optional Path, Query, or Fragment
    // $                        : End of string

    const urlRegex = new RegExp(
        `^` +
        `(?:https?:\\/\\/)?` +
        `(?:www\\.)?` +
        `[a-zA-Z0-9-]+` +
        `(?:\\.[a-zA-Z0-9-]+)*` +
        `\\.[a-zA-Z]{2,}` +
        `(?::\\d{2,5})?` +
        `(?:[/?#].*)?` +
        `$`,
        'i'
    );

    return urlRegex.test(urlString.trim());
}