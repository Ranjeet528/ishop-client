'use client'

import { qtyChange, setCart } from "@/redux/features/cartSlice";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function CartPage() {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  // MongoDB se cart fetch on page load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await client.post("/cart", {
          localStorage: JSON.stringify([])
        });

        if (response.data.success) {
          dispatch(
            setCart({
              items: response.data.cart
            })
          );
        }
      } catch (error) {
        console.log("Fetch cart error:", error);
      }
    };

    fetchCart();
  }, [dispatch]);

  // Qty change handler
  const handleQtyChange = async (id, flag) => {
    try {
      console.log("CLICKED:", id, flag);

      // Redux update
      dispatch(qtyChange({ id, flag }));

      // Backend update
      const response = await client.put("/cart/update-qty", {
        id,
        flag
      });

      console.log("API RESPONSE:", response.data);

    } catch (error) {
      console.log(
        "Qty update error:",
        error.response?.data || error.message
      );
    }
  };

  const subtotal = cart?.items?.reduce(
    (acc, item) => acc + item.final_price * item.qty,
    0
  );

  const shipping = 20;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-[#f8fafc] py-10 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review your items before checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.8fr_0.8fr] gap-8">

          {/* Left Side - Products */}
          <div className="space-y-5">
            {cart.items.length > 0 ? (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[30px] p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between">

                    {/* Product */}
                    <div className="flex gap-5 items-center">
                      <div className="w-[110px] h-[110px] bg-gray-100 rounded-3xl flex items-center justify-center overflow-hidden shrink-0">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={90}
                          height={90}
                          className="object-contain"
                        />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 max-w-[300px]">
                          {item.name}
                        </h2>

                        <p className="text-[#0FA7A6] font-bold text-xl mt-2">
                          ₹{item.final_price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity + Price */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

                      {/* Quantity */}
                      <div className="flex items-center bg-gray-100 rounded-full px-2 py-2">
                        <button
                          onClick={() => handleQtyChange(item.id, "dec")}
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-105 transition"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="w-12 text-center font-semibold text-lg">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => handleQtyChange(item.id, "inc")}
                          className="w-10 h-10 rounded-full bg-[#0FA7A6] text-white flex items-center justify-center hover:scale-105 transition"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-[100px]">
                        <h3 className="font-bold text-xl text-gray-900">
                          ₹{item.final_price * item.qty}
                        </h3>
                      </div>

                      {/* Remove Button */}
                      <button className="w-12 h-12 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-3xl text-center shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700">
                  Your cart is empty
                </h2>
              </div>
            )}
          </div>

          {/* Right Side - Summary */}
          <div className="bg-white rounded-[35px] p-6 shadow-sm border border-gray-100 h-fit sticky top-28">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Coupon */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Coupon Code
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon"
                  className="flex-1 h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-[#0FA7A6]"
                />

                <button className="px-5 rounded-2xl bg-[#0FA7A6] text-white font-medium hover:opacity-90 transition">
                  Apply
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4 border-t border-b py-5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Checkout */}
            <Link
              href="/checkout"
              className="w-full mt-6 h-14 rounded-2xl bg-[#0FA7A6] text-white font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </Link>

            <Link href="/products">
              <button className="w-full mt-4 h-14 rounded-2xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                Continue Shopping
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}