import {auth} from "@/auth"
import SignIn from "@/app/components/SignIn"
import UserCard from "@/app/components/UserCard"

export default async function Home() {
    const session = await auth()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#EFECE3] p-6 text-[#000000]">
            <div className="z-10 w-full max-w-md mt-20 sm:mt-0"> {/* Added margin-top for mobile safety */}
                {session?.user ? (
                    <UserCard user={session.user}/>
                ) : (
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center gap-8">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">OAuth Demo</h1>
                            <p className="text-gray-500 text-sm">Sign in with your preferred provider</p>
                        </div>
                        <SignIn/>
                    </div>
                )}
            </div>
        </main>
    )
}