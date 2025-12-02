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
                            This project implements the <strong>OAuth 2.0 Authorization Code Flow</strong> described in the
                            <em>CS391 OAuth Assignment</em>. It is built using <strong>Auth.js (NextAuth v5)</strong> to abstract
                            the complex handshake shown in the assignment diagram.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>The "Graph" Abstraction:</strong> Instead of manually handling the token exchange (Steps 6-9 in the diagram),
                                the <code>route.ts</code> handler automates this. Clicking "Sign in" triggers <code>Auth.js</code> to manage
                                the handshake with Google/GitHub and retrieve the user's profile securely.
                            </li>
                            <li>
                                <strong>No Database:</strong> Strictly following Requirement #4 ("You do not need to persist/store any data"),
                                this application uses stateless <strong>JSON Web Tokens (JWT)</strong> for session management. No user data
                                is stored on our servers.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#4A70A9]">2. Expected Behavior</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Landing Page:</strong> Unauthenticated users see a "Sign In" card with Google and GitHub options.
                            </li>
                            <li>
                                <strong>Authentication:</strong> Clicking a provider redirects to their native login page.
                                Upon success, you are redirected back.
                            </li>
                            <li>
                                <strong>User Profile:</strong> Once logged in, you will see your
                                real profile picture, name, and email fetched directly from the provider.
                            </li>
                            <li>
                                <strong>No Persistence:</strong> Per Requirement #5 ("Users do not need to stay signed in"),
                                refreshing the page or closing the tab may result in being signed out, as sessions are not persisted in a database.
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </main>
    );
}