

import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import AddToCart from "./AddToCart";

export default function ProductCard({product,imageBaseUrl}) {


  return (
    <div className="bg-white rounded-[30px] p-4 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Top */}
      <div className="flex items-start justify-between">
        {/* Discount */}
        <span className="bg-[#11B5B0]/10 text-[#11B5B0] text-xs font-semibold px-3 py-1 rounded-full">
        {product?.discountPercentage}
        </span>

        {/* Wishlist */}
        <button className="w-10 h-10 rounded-full bg-[#F5F7F9] flex items-center justify-center hover:bg-[#11B5B0] hover:text-white transition">
          <Heart size={18} />
        </button>
      </div>

      {/* Image */}
      <Link
        href="/products/1"
        className="flex items-center justify-center py-5"
      >
        <img
          src={imageBaseUrl}
          alt="product"
          className="h-[180px] object-contain group-hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((item) => (
          <Star
            key={item}
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}

        <span className="text-xs text-gray-500 ml-1">
          (32 Reviews)
        </span>
      </div>

      {/* Category */}
      <p className="text-xs uppercase tracking-wide text-gray-400 mt-3">
        {product.category}
      </p>

      {/* Title */}
      <Link href="/products/1">
        <h2 className="text-[16px] font-bold text-black mt-1 line-clamp-2 hover:text-[#11B5B0] transition">
          {product.name}
        </h2>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xl font-extrabold text-black">
           ₹{product.final_price}
        </span>

        <span className="text-sm text-gray-400 line-through">
         ₹ {product.original_price}
        </span>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center gap-3">
        <AddToCart product={product} imageBaseUrl={imageBaseUrl}/>
       

        <button className="w-12 h-12 rounded-2xl bg-[#F5F7F9] flex items-center justify-center hover:bg-black hover:text-white transition">
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}