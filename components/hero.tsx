'use client'

export function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Removal-862-aMMn7h6W1985XbbIbqV8kENOp0RyI5.png"
          alt="Apex AI Characters"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 text-balance drop-shadow-2xl">
          apex-ai
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-lg">
          The future of artificial intelligence awaits
        </p>
        <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition transform hover:scale-105">
          Explore Now
        </button>
      </div>
    </section>
  )
}
