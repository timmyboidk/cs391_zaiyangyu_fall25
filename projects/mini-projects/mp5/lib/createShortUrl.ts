"use server";

import getCollection, {URLS_COLLECTION} from "@/db";
import {UrlEntry} from "@/type";

//  Backend URL validation
function isValidUrl(urlString: string): boolean {
    try {
        new URL(urlString);
        return true;
    } catch {
        return false;
    }
}

// Define a type
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
    const newEntry: UrlDoc = {
        _id: alias,
        url: url,
        alias: alias,
    };

    try {
        const res = await urlCollection.insertOne(newEntry);

        if (!res.acknowledged) {
            throw new Error("DB insert failed");
        }

        return {alias: alias, url: url};

    } catch (error: unknown) {
        // Repeated aliases  not  allowed
        if (typeof error === 'object' && error !== null && 'code' in error && (error as {
            code: unknown
        }).code === 11000) {
            throw new Error("This alias is already taken.");
        }
        console.error(error);
        throw new Error("An error occurred. Please try again.");
    }
}