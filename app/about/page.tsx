import Link from 'next/link';

export default function About() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold">About Us</h1>
                <p className="text-lg">
                    This page demonstrates a new route in Next.js!
                </p>
                <p>
                    In Laravel, you would define this in <code>routes/web.php</code>.
                    <br />
                    In Next.js, we just created <code>app/about/page.tsx</code>.
                </p>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <Link
                        href="/"
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    >
                        Go Back Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
