"use server";

import getCollection, {URLS_COLLECTION} from "@/db";
import {UrlEntry} from "@/type";

// Requirement 2: Backend URL validation
function isValidUrl(urlString: string): boolean {
    try {
        new URL(urlString);
        return true;
    } catch {
        return false;
    }
}

// Define a type for our document, extending UrlEntry
type UrlDoc = UrlEntry & { _id: string };

export default async function createShortUrl(
    alias: string,
    url: string,
): Promise<UrlEntry> {

    if (!isValidUrl(url)) {
        throw new Error("Invalid URL. Please provide a full URL (e.g., https://google.com)");
    }

    const urlCollection = await getCollection<UrlDoc>(URLS_COLLECTION);

    // Use the alias as the _id to enforce uniqueness
    const newEntry: UrlDoc = { // This is the fix
        _id: alias,
        url: url,
        alias: alias, // This property was missing
    };

    try {
        const res = await urlCollection.insertOne(newEntry);

        if (!res.acknowledged) {
            throw new Error("DB insert failed");
        }

        return {alias: alias, url: url};

    } catch (error: unknown) {
        // Requirement 3: Repeated aliases must not be allowed
        if (typeof error === 'object' && error !== null && 'code' in error && (error as {
            code: unknown
        }).code === 11000) {
            throw new Error("This alias is already taken.");
        }
        console.error(error);
        throw new Error("An error occurred. Please try again.");
    }
}