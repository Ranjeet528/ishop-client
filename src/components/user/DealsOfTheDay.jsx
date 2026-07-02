// "use client";

// import { useState, useEffect } from "react";
// import { ChevronRight, Zap, Heart, ShoppingCart, Star, Truck, Gift } from "lucide-react";
// import AddToCart from "./AddToCart";

// // ─── Data ───────────────────────────────────────────────────────────────────
// const deals = [
//     {
//         id: 1,
//         name: "Samsung Galaxy S24 Ultra 256GB",
//         category: "Smartphones",
//         mainImage: "/images/generated-image.png",
//         thumbs: [
//             "/images/deals/s24-ultra-side.png",
//             "/images/deals/s24-ultra-back.png",
//             "/images/deals/s24-ultra-box.png",
//         ],
//         newPrice: 74999,
//         oldPrice: 99999,
//         rating: 4.5,
//         reviews: 238,
//         sold: 42,
//         total: 75,
//         features: [
//             "200MP Camera with AI Scene Detection",
//             "Snapdragon 8 Gen 3 Processor",
//             "5000mAh Battery, 45W Fast Charging",
//         ],
//         badges: [
//             { label: "Free Shipping", icon: "truck" },
//             { label: "Free Gift", icon: "gift" },
//         ],
//     },
//     {
//         id: 2,
//         name: "Apple MacBook Air M3 8GB 256GB",
//         category: "Laptops",
//         mainImage: "/images/deals/macbook-air.png",
//         thumbs: [
//             "/images/deals/macbook-open.png",
//             "/images/deals/macbook-side.png",
//             "/images/deals/macbook-ports.png",
//         ],
//         newPrice: 89999,
//         oldPrice: 114900,
//         rating: 4.8,
//         reviews: 512,
//         sold: 58,
//         total: 100,
//         features: [
//             "Apple M3 chip with 8-core CPU",
//             "18-hour battery life",
//             "13.6-inch Liquid Retina display",
//         ],
//         badges: [
//             { label: "Free Shipping", icon: "truck" },
//             { label: "EMI Available", icon: "gift" },
//         ],
//     },
//     {
//         id: 3,
//         name: "Sony WH-1000XM5 Headphones",
//         category: "Audio",
//         mainImage: "/images/deals/sony-xm5.png",
//         thumbs: [
//             "/images/deals/sony-side.png",
//             "/images/deals/sony-case.png",
//             "/images/deals/sony-cable.png",
//         ],
//         newPrice: 19999,
//         oldPrice: 34990,
//         rating: 4.7,
//         reviews: 1024,
//         sold: 71,
//         total: 100,
//         features: [
//             "Industry-leading Noise Cancellation",
//             "30-hour battery life",
//             "Multipoint Bluetooth Connection",
//         ],
//         badges: [
//             { label: "Free Shipping", icon: "truck" },
//             { label: "1 Yr Warranty", icon: "gift" },
//         ],
//     },
// ];

// // ─── Countdown Hook ──────────────────────────────────────────────────────────
// function useCountdown() {
//     const [mounted, setMounted] = useState(false);

//     const [time, setTime] = useState({
//         h: "00",
//         m: "00",
//         s: "00",
//     });

//     useEffect(() => {
//         setMounted(true);

//         const tick = () => {
//             const now = new Date();
//             const end = new Date();

//             // Today 11:59:59 PM
//             end.setHours(23, 59, 59, 0);

//             let diff = Math.max(
//                 0,
//                 Math.floor((end.getTime() - now.getTime()) / 1000)
//             );

//             const h = Math.floor(diff / 3600);
//             diff %= 3600;

//             const m = Math.floor(diff / 60);
//             const s = diff % 60;

//             setTime({
//                 h: String(h).padStart(2, "0"),
//                 m: String(m).padStart(2, "0"),
//                 s: String(s).padStart(2, "0"),
//             });
//         };

//         tick();

//         const interval = setInterval(tick, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     // Prevent hydration mismatch
//     if (!mounted) {
//         return {
//             h: "00",
//             m: "00",
//             s: "00",
//         };
//     }

//     return time;
// }

// // ─── Star Rating ─────────────────────────────────────────────────────────────
// function StarRating({ rating, reviews }) {
//     return (
//         <div className="flex items-center gap-2">
//             <div className="flex items-center gap-0.5">
//                 {[1, 2, 3, 4, 5].map((s) => (
//                     <Star
//                         key={s}
//                         size={14}
//                         className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
//                     />
//                 ))}
//             </div>
//             <span className="text-sm text-gray-500">({reviews} reviews)</span>
//         </div>
//     );
// }

// // ─── Placeholder image when real image missing ───────────────────────────────
// function ProductImage({ src, alt, className, style }) {
//     const [error, setError] = useState(false);
//     if (error) {
//         return (
//             <div className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`} style={style}>
//                 <span className="text-white/60 text-xs font-medium text-center px-2">{alt}</span>
//             </div>
//         );
//     }
//     return <img src={src} alt={alt} className={className} style={style} onError={() => setError(true)} />;
// }

// // ─── Main Component ──────────────────────────────────────────────────────────
// export default function DealsOfTheDay() {
//     const time = useCountdown();
//     const [active, setActive] = useState(0);
//     const [activeThumb, setActiveThumb] = useState(0);
//     const deal = deals[active];
//     const discPct = Math.round(((deal.oldPrice - deal.newPrice) / deal.oldPrice) * 100);
//     const soldPct = Math.round((deal.sold / deal.total) * 100);

//     useEffect(() => { setActiveThumb(0); }, [active]);

//     return (
//         <section className="w-full mx-auto my-8">
//             {/* ── Section Header ── */}
//             <div className="bg-[#0FA7A6] max-w-[1400px] mx-auto rounded-t-2xl flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
//                 <div className="flex items-center gap-2.5">
//                     <Zap size={18} className="text-yellow-300 fill-yellow-300 flex-shrink-0" />
//                     <span className="text-white font-extrabold tracking-widest text-sm uppercase">
//                         Deals of the Day
//                     </span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <span className="text-white/70 text-xs hidden sm:block">Ends in:</span>
//                     {[{ v: time.h, l: "h" }, { v: time.m, l: "m" }, { v: time.s, l: "s" }].map((t, i) => (
//                         <div key={i} className="flex items-center gap-1.5">
//                             {i > 0 && <span className="text-white/60 font-bold text-base">:</span>}
//                             <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-sm rounded-lg px-2.5 py-1 min-w-[42px] text-center leading-none">
//                                 {t.v}
//                                 <span className="text-[10px] font-normal opacity-70 ml-0.5">{t.l}</span>
//                             </div>
//                         </div>
//                     ))}
//                     <button className="flex items-center gap-1 text-white text-xs font-semibold ml-1 hover:text-yellow-200 transition-colors whitespace-nowrap">
//                         View All <ChevronRight size={14} />
//                     </button>
//                 </div>
//             </div>

//             {/* ── Body ── */}
//             <div className="border border-[#0FA7A6] max-w-[1400px] mx-auto  border-t-0 rounded-b-2xl bg-white overflow-hidden">
//                 <div className="flex flex-col lg:flex-row">

//                     {/* ── LEFT: Gallery + Product Info ── */}
//                     <div className="flex-1 min-w-0 flex flex-col md:flex-row gap-0">

//                         {/* Thumbnail column */}
//                         <div className="flex md:flex-col gap-2 p-4 md:pr-0 md:py-6 md:pl-5 order-2 md:order-1">
//                             {[deal.mainImage, ...deal.thumbs].map((img, i) => (
//                                 <button
//                                     key={i}
//                                     onClick={() => setActiveThumb(i)}
//                                     className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${activeThumb === i
//                                             ? "border-[#0FA7A6] shadow-md shadow-teal-100"
//                                             : "border-gray-100 hover:border-[#0FA7A6]/50"
//                                         }`}
//                                 >
//                                     <ProductImage
//                                         src={img}
//                                         alt={`View ${i}`}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Main Image */}
//                         <div className="flex-1 relative bg-gray-50 flex items-center justify-center order-1 md:order-2 mx-4 mt-4 md:mx-4 md:my-5 rounded-2xl overflow-hidden min-h-[240px] md:min-h-[300px]">
//                             <div className="absolute top-3 left-3 z-10">
//                                 <span className="bg-[#0FA7A6] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">
//                                     SAVE ₹{(deal.oldPrice - deal.newPrice).toLocaleString("en-IN")}
//                                 </span>
//                             </div>
//                             <div className="absolute top-3 right-3 z-10">
//                                 <span className="bg-orange-500 text-white text-xs font-extrabold px-2.5 py-1.5 rounded-xl">
//                                     -{discPct}%
//                                 </span>
//                             </div>
//                             <ProductImage
//                                 src={activeThumb === 0 ? deal.mainImage : [deal.mainImage, ...deal.thumbs][activeThumb]}
//                                 alt={deal.name}
//                                 className="max-h-[260px] md:max-h-[300px] object-contain p-4 transition-all duration-300"
//                             />
//                         </div>

//                         {/* ── Product Details ── */}
//                         <div className="flex-1 p-5 md:p-6 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center">
//                             <div className="mb-2">
//                                 <span className="text-xs text-[#0FA7A6] font-semibold uppercase tracking-wide">
//                                     {deal.category}
//                                 </span>
//                             </div>

//                             <StarRating rating={deal.rating} reviews={deal.reviews} />

//                             <h2 className="text-lg md:text-xl font-bold text-gray-800 mt-2 mb-3 leading-snug">
//                                 {deal.name}
//                             </h2>

//                             {/* Price */}
//                             <div className="flex flex-wrap items-baseline gap-2 mb-4">
//                                 <span className="text-2xl md:text-3xl font-extrabold text-[#0FA7A6]">
//                                     ₹{deal.newPrice.toLocaleString("en-IN")}
//                                 </span>
//                                 <span className="text-base text-gray-400 line-through">
//                                     ₹{deal.oldPrice.toLocaleString("en-IN")}
//                                 </span>
//                             </div>

//                             {/* Features */}
//                             <ul className="space-y-1.5 mb-4">
//                                 {deal.features.map((f, i) => (
//                                     <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
//                                         <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#0FA7A6] flex-shrink-0" />
//                                         {f}
//                                     </li>
//                                 ))}
//                             </ul>

//                             {/* Badges */}
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {deal.badges.map((b, i) => (
//                                     <span
//                                         key={i}
//                                         className="flex items-center gap-1.5 text-xs font-semibold border border-[#0FA7A6] text-[#0FA7A6] px-3 py-1.5 rounded-lg"
//                                     >
//                                         {b.icon === "truck" ? <Truck size={12} /> : <Gift size={12} />}
//                                         {b.label}
//                                     </span>
//                                 ))}
//                             </div>

//                             {/* Hurry up timer */}
//                             <div className="flex flex-wrap items-center gap-3 mb-4 bg-gray-50 rounded-xl p-3">
//                                 <div className="leading-tight">
//                                     <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Hurry Up!</p>
//                                     <p className="text-xs text-gray-400">Promotion expires in</p>
//                                 </div>
//                                 <div className="flex items-center gap-1.5 ml-auto">
//                                     {[{ v: time.h, l: "h" }, { v: time.m, l: "m" }, { v: time.s, l: "s" }].map((t, i) => (
//                                         <div key={i} className="flex items-center gap-1">
//                                             {i > 0 && <span className="text-gray-400 font-bold text-sm">:</span>}
//                                             <div className="border border-gray-200 bg-white rounded-lg text-center px-2.5 py-1.5 min-w-[44px]">
//                                                 <span className="text-base font-bold text-gray-800">{t.v}</span>
//                                                 <span className="text-[10px] text-gray-400 ml-0.5">{t.l}</span>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Progress bar */}
//                             <div className="mb-5">
//                                 <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
//                                     <div
//                                         className="h-full rounded-full bg-[#0FA7A6] transition-all duration-700"
//                                         style={{ width: `${soldPct}%` }}
//                                     />
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1.5">
//                                     Sold:{" "}
//                                     <span className="font-bold text-gray-700">
//                                         {deal.sold}/{deal.total}
//                                     </span>
//                                     <span className="ml-1 text-[#0FA7A6] font-semibold">({soldPct}%)</span>
//                                 </p>
//                             </div>

//                             {/* CTA */}
//                             <div className="flex flex-wrap gap-3">
//                                 <AddToCart/>
//                                 <button className="flex-1 min-w-[100px] border-2 border-[#0FA7A6] text-[#0FA7A6] hover:bg-teal-50 font-bold py-3 rounded-xl transition-all duration-200 text-sm active:scale-95">
//                                     Buy Now
//                                 </button>
//                                 <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl text-gray-400 hover:text-red-400 hover:border-red-200 hover:bg-red-50 transition-all duration-200 flex-shrink-0">
//                                     <Heart size={18} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ── RIGHT: Other Deals Sidebar ── */}
//                     <div className="lg:w-56 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 flex lg:flex-col overflow-x-auto lg:overflow-visible">
//                         {deals.map((d, i) => {
//                             const dp = Math.round(((d.oldPrice - d.newPrice) / d.oldPrice) * 100);
//                             const isActive = active === i;
//                             return (
//                                 <button
//                                     key={d.id}
//                                     onClick={() => setActive(i)}
//                                     className={`flex lg:flex-col items-center gap-3 lg:gap-2 px-4 py-4 lg:py-5 text-left lg:text-center border-b border-gray-100 last:border-0 transition-all duration-200 flex-shrink-0 lg:flex-shrink ${isActive
//                                             ? "bg-teal-50 lg:border-l-2 lg:border-l-[#0FA7A6]"
//                                             : "hover:bg-gray-50"
//                                         }`}
//                                 >
//                                     {/* Thumbnail */}
//                                     <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex-shrink-0">
//                                         <ProductImage
//                                             src={d.mainImage}
//                                             alt={d.name}
//                                             className="w-full h-full object-cover"
//                                         />
//                                         <span className="absolute top-1 right-1 bg-orange-500 text-white text-[9px] font-bold px-1 py-0.5 rounded">
//                                             -{dp}%
//                                         </span>
//                                     </div>
//                                     {/* Info */}
//                                     <div className="flex-1 lg:flex-none">
//                                         <p className="text-xs font-semibold text-gray-700 line-clamp-2 leading-snug lg:text-center">
//                                             {d.name}
//                                         </p>
//                                         <p className="text-sm font-extrabold text-[#0FA7A6] mt-1">
//                                             ₹{d.newPrice.toLocaleString("en-IN")}
//                                         </p>
//                                         <p className="text-xs text-gray-400 line-through">
//                                             ₹{d.oldPrice.toLocaleString("en-IN")}
//                                         </p>
//                                     </div>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Zap, Heart, Star, Truck, Gift } from "lucide-react";
import AddToCart from "./AddToCart";

// ─── Data ───────────────────────────────────────────────────────────────
const deals = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra 256GB",
    category: "Smartphones",
    mainImage: "/images/generated-image.png",
    thumbs: [
      "/images/deals/s24-ultra-side.png",
      "/images/deals/s24-ultra-back.png",
      "/images/deals/s24-ultra-box.png",
    ],
    newPrice: 74999,
    oldPrice: 99999,
    rating: 4.5,
    reviews: 238,
    sold: 42,
    total: 75,
    stock: 10,
    features: [
      "200MP Camera with AI Scene Detection",
      "Snapdragon 8 Gen 3 Processor",
      "5000mAh Battery, 45W Fast Charging",
    ],
    badges: [
      { label: "Free Shipping", icon: "truck" },
      { label: "Free Gift", icon: "gift" },
    ],
  },
  {
    id: 2,
    name: "Apple MacBook Air M3 8GB 256GB",
    category: "Laptops",
    mainImage: "/images/deals/macbook-air.png",
    thumbs: [
      "/images/deals/macbook-open.png",
      "/images/deals/macbook-side.png",
      "/images/deals/macbook-ports.png",
    ],
    newPrice: 89999,
    oldPrice: 114900,
    rating: 4.8,
    reviews: 512,
    sold: 58,
    total: 100,
    stock: 8,
    features: [
      "Apple M3 chip with 8-core CPU",
      "18-hour battery life",
      "13.6-inch Liquid Retina display",
    ],
    badges: [
      { label: "Free Shipping", icon: "truck" },
      { label: "EMI Available", icon: "gift" },
    ],
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    mainImage: "/images/deals/sony-xm5.png",
    thumbs: [
      "/images/deals/sony-side.png",
      "/images/deals/sony-case.png",
      "/images/deals/sony-cable.png",
    ],
    newPrice: 19999,
    oldPrice: 34990,
    rating: 4.7,
    reviews: 1024,
    sold: 71,
    total: 100,
    stock: 5,
    features: [
      "Industry-leading Noise Cancellation",
      "30-hour battery life",
      "Multipoint Bluetooth Connection",
    ],
    badges: [
      { label: "Free Shipping", icon: "truck" },
      { label: "1 Yr Warranty", icon: "gift" },
    ],
  },
];

// ─── Countdown ──────────────────────────────────────────────────────────
function useCountdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 0);

      let diff = Math.max(0, Math.floor((end - now) / 1000));

      const h = Math.floor(diff / 3600);
      diff %= 3600;
      const m = Math.floor(diff / 60);
      const s = diff % 60;

      setTime({
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return { h: "00", m: "00", s: "00" };

  return time;
}

// ─── Star Rating ────────────────────────────────────────────────────────
function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={
              s <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">({reviews})</span>
    </div>
  );
}

// ─── Image Safe Component ───────────────────────────────────────────────
function ProductImage({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
        <span className="text-white text-xs text-center px-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

// ─── Main Component ─────────────────────────────────────────────────────
export default function DealsOfTheDay() {
  const time = useCountdown();
  const [active, setActive] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);

  const deal = deals?.[active] || deals[0];

  const discPct = Math.round(
    (((deal?.oldPrice || 1) - (deal?.newPrice || 0)) /
      (deal?.oldPrice || 1)) *
      100
  );

  const soldPct = Math.round(
    ((deal?.sold || 0) / (deal?.total || 1)) * 100
  );

  useEffect(() => {
    setActiveThumb(0);
  }, [active]);

  return (
    <section className="w-full mx-auto my-8">
      {/* Header */}
      <div className="bg-[#0FA7A6] max-w-[1400px] mx-auto rounded-t-2xl flex justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <Zap className="text-yellow-300" size={18} />
          <span className="text-white font-bold uppercase">
            Deals of the Day
          </span>
        </div>

        <div className="flex items-center gap-2 text-white text-sm">
          {time.h}:{time.m}:{time.s}
        </div>
      </div>

      {/* Body */}
      <div className="border border-[#0FA7A6] max-w-[1400px] mx-auto bg-white rounded-b-2xl">
        <div className="flex flex-col lg:flex-row">

          {/* LEFT */}
          <div className="flex-1 p-5">

            {/* Image */}
            <div className="bg-gray-50 rounded-xl p-4 flex justify-center">
              <ProductImage
                src={deal?.mainImage}
                alt={deal?.name}
                className="h-60 object-contain"
              />
            </div>

            {/* CTA */}
            <div className="flex gap-3 mt-5">
              <AddToCart
                product={{
                  id: deal?.id,
                  name: deal?.name,
                  stock: deal?.stock,
                  original_price: deal?.oldPrice,
                  final_price: deal?.newPrice,
                  discountPercentage: discPct,
                }}
                imageBaseUrl={deal?.mainImage}
              />

              <button className="flex-1 border border-teal-500 text-teal-500 rounded-xl">
                Buy Now
              </button>

              <button className="w-12 h-12 border rounded-xl">
                <Heart size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-60 border-l p-3">
            {deals.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActive(i)}
                className="w-full text-left p-2 border-b"
              >
                <p className="text-xs font-semibold">{d.name}</p>
                <p className="text-teal-600 font-bold">₹{d.newPrice}</p>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
