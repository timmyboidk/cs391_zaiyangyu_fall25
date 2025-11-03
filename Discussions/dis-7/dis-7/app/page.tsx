import getAllPosts from "@/lib/getAllPosts";
import PostsDisplay from "@/app/components/PostsDisplay";

export default async function Home() {
    const posts = await getAllPosts();
    return (
      <div className="flex flex-col items-center bg-blue-200 p-4">
            <PostsDisplay inputPosts={posts}/>
      </div>
  );
}
