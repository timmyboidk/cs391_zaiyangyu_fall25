import getUrlByAlias from "@/lib/getUrlByAlias";
import { redirect } from "next/navigation";

export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    let url = null;
    try {
        url = await getUrlByAlias(alias);
    } catch (err) {
        console.error("Error fetching URL by alias:", err);
        return redirect("/");
    }

    if (!url) {
        return redirect("/");
    }

    redirect(url);
}