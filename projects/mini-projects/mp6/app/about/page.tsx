import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#EFECE3] p-6 text-[#000000]">
            <div className="z-10 w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">About This Project</h1>
                    <Link href="/" className="text-sm text-[#4A70A9] hover:text-[#8FABD4] transition font-semibold">
                        ← Back to App
                    </Link>
                </div>

                <div className="space-y-8 text-gray-700">

                    {/* Section 1: Implementation vs Lecture/Requirements */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#4A70A9]">1. Implementation & The OAuth Flow</h2>
                        <p>
                            This project implements the OAuth 2.0 Authorization Code Flow described in
                            the
                            diagram in the mp description, abstracts the complexity
                            using Auth.js.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                The assignment graph shows 11 steps (Request
                                Login &rarr; Provider Redirect &rarr; Auth Code &rarr; Access Token).
                                Instead of manually handling the <em>Exchange Code</em> (Step 6-9),
                                the <code>route.ts</code> handler automates this.
                                When you click &#34;Sign in&#34;, <code>Auth.js</code> manages the handshake with Google/GitHub,
                                retrieves the tokens, and establishes a session.
                            </li>
                            <li>
                                Following <em>Lecture 18</em>, we used the Beta
                                version of NextAuth.
                                The file structure (<code>auth.ts</code> in
                                root, <code>app/api/auth/[...nextauth]/route.ts</code>) strictly follows the lecture&#39;s
                                &#34;App Router&#34; guidelines to handle requests securely on the server side.
                            </li>
                            <li>
                                Database Integration: This project implements
                                MongoDB persistence using the <code>MongoDBAdapter</code>. This means
                                user sessions and accounts are physically stored in
                                my <code>cs391_oauth</code> database.
                            </li>
                        </ul>
                    </section>

                    {/* Section 2: Expected Behavior */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#4A70A9]">2. Expected Behavior</h2>
                        <p>
                            Here is what you should expect when interacting with this application:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Landing Page: If you are not authenticated, you will see a &#34;Sign In&#34;
                                card with options for Google and GitHub.
                            </li>
                            <li>
                                Authentication: Clicking a provider will redirect you to their native
                                login page.
                                Upon success, you are redirected back to the app.
                            </li>
                            <li>
                                User Profile: Once logged in, the &#34;Sign In&#34; card is replaced by
                                a User Card displaying your
                                real profile picture, name, and email fetched from the provider.
                            </li>
                            <li>
                                Session Persistence: This app <strong>persists
                                your session</strong>.
                                Refreshing the page will <em>not</em> log you out immediately, thanks to the database
                                session storage.
                            </li>
                            <li>
                                Sign Out: Clicking &#34;Sign Out&#34; destroys the session and returns you to
                                the login screen.
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </main>
    );
}