import FullPost from "@/app/components/FullPost";
import getPostById from "@/lib/getPostById";
import {redirect} from "next/navigation";

export default async function FullPostPage({params,}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    let post=null;

    try {
        post = await getPostById(id);
    } catch (err) {
        console.log("This error occured",err);
        return redirect("/");
    }
    if (!post) {
        redirect("/")
    }
    return <FullPost post={post} />
}