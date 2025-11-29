import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import {MongoDBAdapter} from "@auth/mongodb-adapter"
import clientPromise from "@/db" // Import from your new db.ts

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: "cs391_oauth",
        collections: {
            Users: "oauth",
        },
    }),
    providers: [
        GitHub,
        Google
    ],
})