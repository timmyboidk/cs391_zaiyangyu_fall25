import getUrlByAlias from "@/lib/getUrlByAlias";
import {redirect} from "next/navigation";

export default async function RedirectPage({
                                               params,
                                           }: {
    params: { alias: string };
}) {
    const {alias} = params;

    let url = null;
    try {
        url = await getUrlByAlias(alias);
    } catch (err) {
        console.error("Error fetching URL by alias:", err);
        return redirect("/"); // Redirect home on error
    }

    if (!url) {
        return redirect("/"); // Redirect home if alias not found
    }

    // Requirement 4: Users must be redirected
    redirect(url);
}