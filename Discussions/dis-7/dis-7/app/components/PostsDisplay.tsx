"use client";
import {PostProps} from "@/type";
import {useState} from "react";
import PostPreview from "@/app/components/PostPreview";
import NewPostForm from "@/app/components/NewPostForm";

export default function PostsDisplay({
                                         inputPosts,
                                     }: {
    inputPosts: PostProps[];
}) {
    const [posts, setPosts] = useState(inputPosts);

    return (
        <div className="flex flex-col items-center">
            <NewPostForm
                append={(newPost: PostProps) => {
                    setPosts([...posts, newPost]);
                }}
            />
            {posts.map((p) => (
                <PostPreview key = {p.id} post ={p}/>
            ))}
        </div>
    );
}