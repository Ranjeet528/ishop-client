'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { client, notify } from "@/utils/helper";
import { FiShoppingBag } from "react-icons/fi";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
 const [items, setItems] = useState([]);  

useEffect(() => {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || null;

  setItems(cart?.items || []);
}, []);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

   client.post("user/login", form, {
  withCredentials: true
})
      .then(async (response) => {
        console.log(response.data.data.email, "email")
        notify(response.data.message, response.data.success);
        if (response.data.success) {

          // setForm({
          //     email: "",
          //     password: ""
          // })
         try {
  const cartRes = await client.post("cart", {
    localStorage: JSON.stringify(items)
  })
            const cartData = cartRes.data?.cart?.items || [];
            console.log(cartData)
            let final_total = 0;
            let original_total = 0;
            const updatedItems = cartData
  ?.map((item) => {
    if (!item.productId) return null;

    const {
      name,
      _id,
      original_price,
      final_price,
      discount_percentage,
      price,
      thumbnail,
      stock,
    } = item.productId;

    console.log(thumbnail, "thumbnail");

    final_total +=
      (final_price || 0) * item.qty;

    original_total +=
      (original_price || 0) * item.qty;

    return {
      name,
      _id,
      original_price,
      final_price,
      discount_percentage,
      price,
      thumbnail: thumbnail
        ? cartRes.data.imageBaseUrl +
          thumbnail
        : "",
      stock,
      qty: item.qty,
    };
  })
  .filter(Boolean);

            localStorage.setItem("cart", JSON.stringify({
              final_total,
              original_total,
              items:updatedItems
            }))


          } catch (error) {
            console.log(error)
          }

           router.refresh();
           router.push("/");
        
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message || "Internal server error";
        notify(message, false);
      })
      .finally(() => {
        setLoading(false);
      });

  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#E8F8F8] via-white to-[#D9F3F2] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(15,167,166,0.15)]">

        {/* Left Side */}
        <div className="hidden lg:flex bg-[#0FA7A6] p-12 text-white flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-2xl">
                <FiShoppingBag size={28} />
              </div>

              <h1 className="text-3xl font-bold">
                Ishop
              </h1>
            </div>

            <div className="mt-16">
              <h2 className="text-5xl font-bold leading-tight">
                Welcome Back to <br />
                Your Shopping World
              </h2>

              <p className="mt-5 text-white/80 text-lg leading-8">
                Sign in to continue shopping amazing
                products with the best deals and
                seamless experience.
              </p>
            </div>
          </div>

          <p className="text-white/70 text-sm">
            © 2026 Ishop. All rights reserved.
          </p>

          {/* Decorative circles */}
          <div className="absolute -right-10 top-10 h-52 w-52 rounded-full bg-white/10"></div>
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-2xl"></div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="lg:hidden flex justify-center mb-8">
              <div className="bg-[#0FA7A6] text-white p-4 rounded-2xl">
                <FiShoppingBag size={30} />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Login
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              Welcome back! Please login to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-14 px-5 rounded-2xl border border-gray-300 bg-gray-50 outline-none focus:border-[#0FA7A6] focus:ring-4 focus:ring-[#0FA7A6]/20 transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full h-14 px-5 rounded-2xl border border-gray-300 bg-gray-50 outline-none focus:border-[#0FA7A6] focus:ring-4 focus:ring-[#0FA7A6]/20 transition"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#0FA7A6] font-medium hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button disabled={loading} className="w-full h-14 rounded-2xl bg-[#0FA7A6] text-white font-semibold text-lg hover:opacity-90 transition duration-300 shadow-lg shadow-[#0FA7A6]/30">
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#0FA7A6] font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;