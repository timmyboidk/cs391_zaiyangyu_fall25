import Image from "next/image"
import SignOut from "./SignOut"

type UserProps = {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export default function UserCard({user}: UserProps) {
    return (
        <div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center gap-4 w-full">
            {user.image && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#EFECE3]">
                    <Image
                        src={user.image}
                        alt="Profile"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-black">{user.name}</h2>
                <p className="text-gray-500 font-medium">{user.email}</p>
            </div>
            <div className="mt-2 w-full border-t border-gray-100 pt-4 flex justify-center">
                <SignOut/>
            </div>
        </div>
    )
}