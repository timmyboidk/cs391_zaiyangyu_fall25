"use server";
import getCollection, {URLS_COLLECTION} from "@/db";
import {UrlEntry} from "@/type";
import {isValidUrl} from "@/lib/validator";

type UrlDoc = UrlEntry & { _id: string };

export default async function createShortUrl(
    alias: string,
    url: string,
): Promise<UrlEntry> {

    const cleanUrl = url.trim();

    // Syntax Check
    if (!isValidUrl(cleanUrl)) {
        throw new Error("Invalid URL format. Please check for typos.");
    }

    // 2. Alias Safety Check
    // Only allow letters, numbers, hyphens, and underscores.
    const aliasRegex = /^[a-zA-Z0-9-_]+$/;
    if (!aliasRegex.test(alias)) {
        throw new Error("Invalid Alias: Only letters, numbers, dashes, and underscores are allowed.");
    }

    // Standardize Protocol
    let standardizedUrl = cleanUrl;
    if (!standardizedUrl.match(/^https?:\/\//i)) {
        standardizedUrl = 'https://' + standardizedUrl;
    }

    //  Cycle Prevention (
    if (standardizedUrl.includes("cs391-url-shortener") || standardizedUrl.includes("localhost")) {
        throw new Error("Cycle detected: You cannot shorten a link from this website.");
    }

    // 4. Reachability Check (New)
    // Verifies the website actually exists using a HEAD request (lighter than GET).
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout

        const response = await fetch(standardizedUrl, {
            method: 'HEAD',
            signal: controller.signal,
            // User-agent helps avoid being blocked by some bot protections
            headers: {'User-Agent': 'Mozilla/5.0 (compatible; CS391Shortener/1.0)'}
        });

        clearTimeout(timeoutId);

        // 404 explicitly means the page is missing.
        if (response.status === 404) {
            throw new Error("This URL does not exist (404 Not Found).");
        }
    } catch (error: any) {
        // Differentiate between a timeout/network error and our explicit 404 error
        if (error.message === "This URL does not exist (404 Not Found).") {
            throw error;
        }
        // Note: We generally "fail open" for timeouts to avoid blocking valid slow sites,
        // but you can uncomment the line below to be strict.
        // throw new Error("Could not verify that this website is reachable.");
        console.warn("Verification warning:", error.message);
    }

    const urlCollection = await getCollection<UrlDoc>(URLS_COLLECTION);

    const newEntry: UrlDoc = {
        _id: alias,
        url: standardizedUrl,
        alias: alias,
    };

    try {
        const res = await urlCollection.insertOne(newEntry);
        if (!res.acknowledged) {
            throw new Error("DB insert failed");
        }
        return {alias: alias, url: standardizedUrl};
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error && (error as {
            code: unknown
        }).code === 11000) {
            throw new Error("This alias is already taken.");
        }
        console.error(error);
        throw new Error("An error occurred. Please try again.");
    }
}