import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#EFECE3] p-6 text-[#000000]">
            <div className="z-10 w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">About This Project</h1>
                    <Link
                        href="/"
                        className="text-sm text-[#4A70A9] hover:text-[#8FABD4] transition font-semibold"
                    >
                        ← Back to App
                    </Link>
                </div>

                <div className="space-y-8 text-gray-700">

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#4A70A9]">1. Implementation & The OAuth Flow</h2>
                        <p>
                            This project implements the OAuth 2.0 Authorization described in the
                            mp6 specs. It is built using Auth.js (NextAuth v5) to abstract  the  handshake shown in the assignment diagram.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                The "Graph" Abstraction: Instead of manually handling the token exchange (Steps 6-9 in the diagram),
                                the route.ts handler automates this. Clicking "Sign in" triggers Auth.js to manage
                                the handshake with Google or GitHub and retrieve the user's profile securely.
                            </li>
                            <li>
                                No Database: follows Requirement ("You do not need to persist/store any data"),
                                this application uses stateless JSON Web Tokens (JWT) for session management. No user data
                                is stored on our servers.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#4A70A9]">2. Expected Behavior</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Landing Page: Unauthenticated users see a "Sign In" card with Google and GitHub options.
                            </li>
                            <li>
                                Authentication: Clicking a provider redirects to their native login page.
                                Upon success, you are redirected back.
                            </li>
                            <li>
                                User Profile: Once logged in, you will see your
                                real profile picture, name, and email fetched directly from the provider.
                            </li>
                            <li>
                                No Persistence: For Requirement ("Users do not need to stay signed in"),
                                refreshing the page or closing the tab may result in being signed out, as sessions are not persisted in a database.
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </main>
    );
}