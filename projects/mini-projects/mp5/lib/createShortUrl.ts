"use server";
import getCollection, {URLS_COLLECTION} from "@/lib/db";
import {UrlEntry} from "@/lib/type";
import {isValidUrl} from "@/lib/validator";

type UrlDoc = UrlEntry & { _id: string };

export default async function createShortUrl(
    alias: string,
    url: string,
): Promise<UrlEntry> {

    // prevent " https://..." errors
    const cleanUrl = url.trim();

    // Backend Validation
    if (!isValidUrl(cleanUrl)) {
        throw new Error("Invalid URL. Please check the structure (must include www. and a valid TLD).");
    }
    //  Prepend protocol if missing.
    let standardizedUrl = cleanUrl;
    if (!standardizedUrl.match(/^https?:\/\//i)) {
        standardizedUrl = 'https://' + standardizedUrl;
    }

    const urlCollection = await getCollection<UrlDoc>(URLS_COLLECTION);
    const newEntry: UrlDoc = {
        _id: alias,
        url: standardizedUrl, // Save the ABSOLUTE URL
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