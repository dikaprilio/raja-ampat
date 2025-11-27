import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/hero-bg.png"
                    alt="Raja Ampat Aerial View"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl drop-shadow-lg">
                    Save <span className="text-teal-400">Raja Ampat</span>
                </h1>
                <p className="mb-10 max-w-2xl text-lg font-medium sm:text-xl md:text-2xl drop-shadow-md text-gray-100">
                    Preserve the crown jewel of the ocean. Join the movement to protect the world&apos;s richest marine biodiversity.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/donate"
                        className="group relative overflow-hidden rounded-full bg-teal-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-teal-600 hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)]"
                    >
                        <span className="relative z-10">Make an Impact</span>
                        <div className="absolute inset-0 -z-10 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
                    </Link>
                    <Link
                        href="/about"
                        className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
                    >
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="h-8 w-8 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
