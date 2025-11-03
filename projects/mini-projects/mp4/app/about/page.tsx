import Header from '../components/Header';

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-12">
            <Header/>
            <div className="max-w-md text-lg mt-8">
                <h1 className="text-3xl font-bold mb-4">About This Project</h1>
                <p>
                    This is MP-4, a project demonstrating secure API key usage
                    in a Next.js App Router project.
                </p>
                <p className="mt-4">
                    It uses a Server Action to protect the Amdoren API key.
                </p>
            </div>
        </main>
    );
}