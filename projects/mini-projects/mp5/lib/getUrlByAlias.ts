import getCollection, {URLS_COLLECTION} from "@/lib/db";
import {UrlEntry} from "@/lib/type";

type UrlDoc = UrlEntry & { _id: string };

export default async function getUrlByAlias(alias: string): Promise<string | null> {
    const urlCollection = await getCollection<UrlDoc>(URLS_COLLECTION);

    const data = await urlCollection.findOne({_id: alias});

    if (!data) return null;

    return data.url;
}