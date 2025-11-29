import {signIn} from "@/auth"

export default function SignIn() {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/*Google*/}
            <form action={async () => {
                "use server"
                await signIn("google")
            }}
                  className="w-full">
                <button
                    type="submit"
                    className="w-full bg-[#4A70A9] hover:bg-[#8FABD4] text-white font-bold py-3 px-4 rounded shadow transition duration-200"
                >
                    Sign in with Google
                </button>
            </form>
            {/* GitHub*/}
            <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
                className="w-full"
            >
                <button type="submit"
                        className="w-full bg-[#4A70A9] hover:bg-[#8FABD4] text-white font-bold py-3 px-4 rounded shadow transition duration-200">
                    Sign in with GitHub
                </button>
            </form>
        </div>
    )
}