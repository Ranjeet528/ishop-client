import Link from "next/link";

export default function TopBanner() {
  return (
    <section className="mt-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
        <div>
          <p className="text-sm uppercase tracking-[3px] text-[#11B5B0] font-semibold">
            Featured Collection
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mt-2">
            Top Cell Phones & Tablets
          </h2>


        </div>

        <button className="text-[#11B5B0] font-semibold hover:underline">
          View All
        </button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Big Banner */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F8FAFC] via-[#F4F6F8] to-[#EEF2F6] border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.06)] min-h-[220px] md:min-h-[260px] lg:min-h-[280px]">

          <div className="grid grid-cols-2 h-full items-center">

            {/* Content */}
            <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 z-10">
              <span className="text-[11px] sm:text-sm uppercase tracking-[3px] text-[#11B5B0] font-semibold">
                Starting at $899
              </span>

              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight mt-2">
                Premium Sound,
                <br />
                Premium Choice
              </h1>

              <p className="text-gray-500 mt-3 text-xs sm:text-sm md:text-base max-w-md leading-6">
                Experience immersive sound quality
                with our premium wireless headphone
                collection.
              </p>

              <div className="mt-5">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center bg-[#11B5B0] text-white px-5 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition duration-300 text-sm w-fit"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex items-center justify-center h-full overflow-hidden">

              {/* Premium Glow */}
              <div className="absolute w-[180px] sm:w-[220px] md:w-[280px] h-[180px] sm:h-[220px] md:h-[280px] bg-[#11B5B0]/10 rounded-full blur-[70px]" />

              <img
                src="/images/pexels-sound-on-3394650.jpg"
                alt="Headphone"
                className="
          relative z-10
          w-[110px]
          sm:w-[140px]
          md:w-[190px]
          lg:w-[240px]
          object-contain
          rounded-[24px]
          shadow-[0_25px_50px_rgba(0,0,0,0.12)]
          hover:scale-105
          transition-transform
          duration-500
        "
              />
            </div>
          </div>

          {/* Top Right Decorative Blur */}
          <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] bg-[#11B5B0]/10 rounded-full blur-3xl" />

          {/* Bottom Left Light Effect */}
          <div className="absolute bottom-[-60px] left-[-40px] w-[140px] h-[140px] bg-white rounded-full blur-3xl opacity-60" />
        </div>
        {/* Right Small Banner */}
        <div className="relative overflow-hidden rounded-[28px] min-h-[220px] md:min-h-[260px] lg:min-h-[280px] p-5 sm:p-6 bg-gradient-to-br from-[#dff7f7] via-[#b9eceb] to-[#89d8d6] flex flex-col justify-between">

          {/* Text */}
          <div className="relative z-10">
            <span className="text-xs sm:text-sm uppercase tracking-[2px] text-[#0d6665] font-semibold">
              New Arrival
            </span>

            <h2 className="text-xl sm:text-2xl font-bold mt-2 text-[#0f172a] leading-tight">
              iPhone 16 Pro
            </h2>

            <p className="text-gray-700 mt-2 text-sm leading-5 max-w-[220px]">
              Meet the future of smartphones with
              ultra-fast performance.
            </p>
          </div>

          {/* Right Banner Image */}
          <div className="absolute right-0 bottom-0 h-full w-[55%] flex items-end justify-end pr-6 overflow-hidden">
            {/* Glow Background */}
            <div className="absolute bottom-10 right-16 w-[280px] h-[280px] bg-cyan-400/10 blur-[90px] rounded-full" />

            <img
              src="/images/iphone16 pro.png"
              alt="Phone"
              className="
              h-[96%]
              w-auto
      object-contain
      drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]
      transition-transform
      duration-500
      hover:scale-[1.03]
      relative
      z-10
    "
            />
          </div>

          {/* Button */}
          <Link
            href="/products"
            className="relative z-10 text-[#0d6665] font-semibold text-sm hover:underline"
          >
            Shop Collection →
          </Link>

          {/* Decorative Glow */}
          <div className="absolute -top-12 -right-10 w-36 h-36 bg-white/30 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}