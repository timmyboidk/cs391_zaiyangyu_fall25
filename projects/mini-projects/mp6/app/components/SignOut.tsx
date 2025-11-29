import {signOut} from "@/auth"

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button
                type="submit"
                className="text-sm text-gray-500 hover:text-[#4A70A9] underline decoration-1 underline-offset-4 font-semibold"
            >
                Sign Out
            </button>
        </form>
    )
}