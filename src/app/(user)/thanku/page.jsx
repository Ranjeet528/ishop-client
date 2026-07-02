"use client";

import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-3xl p-8 md:p-12 text-center max-w-md w-full">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for your purchase 🎉
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="mt-4 text-sm text-gray-600">
            Order ID:
            <span className="font-semibold text-gray-900 ml-1">
              {orderId}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <Link
            href="/products"
            className="w-full flex items-center justify-center gap-2 bg-[#0FA7A6] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            <Home size={18} />
            Go to Home
          </Link>
        </div>

      </div>
    </div>
  );
}