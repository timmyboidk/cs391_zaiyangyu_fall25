"use server";
import getCollection, {URLS_COLLECTION} from "@/db";
import {UrlEntry} from "@/type";
import {isValidUrl} from "@/lib/validator";

type UrlDoc = UrlEntry & { _id: string };

export default async function createShortUrl(
    alias: string,
    url: string,
): Promise<UrlEntry> {
    // Backend Validation
    if (!isValidUrl(url)) {
        throw new Error("Invalid URL. Please provide a valid URL (e.g., https://google.com)");
    }

    const urlCollection = await getCollection<UrlDoc>(URLS_COLLECTION);

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
        if (typeof error === 'object' && error !== null && 'code' in error && (error as {
            code: unknown
        }).code === 11000) {
            throw new Error("This alias is already taken.");
        }
        console.error(error);
        throw new Error("An error occurred. Please try again.");
    }
}