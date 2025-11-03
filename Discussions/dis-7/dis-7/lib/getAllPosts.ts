import mockData from "@/mock.json";
import {PostProps} from "@/type";

export default async function getAllPosts(): Promise<PostProps[]> {
    return mockData.mockPosts;
}

