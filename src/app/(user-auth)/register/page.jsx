"use client"
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    client
      .post("user/register", form)
      .then((response) => {
        notify(response.data.message, response.data.success);

        if (response.data.success) {
          console.log(response.data);

          setForm({
            name: "",
            email: "",
            password: "",
          });

          router.push(
            `/verify-otp?email=${response.data.data.email}`
          );
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message ||
          "Internal Server Error";

        notify(message, false);
      })
      .finally(() => {
        setLoading(false);
      });
    }

    return (
      <section className="min-h-screen bg-gradient-to-br from-[#E8F8F8] via-white to-[#D9F3F2] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(15,167,166,0.15)]">

          {/* Left */}
          <div className="hidden lg:flex bg-[#0FA7A6] p-12 text-white flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <ShoppingBag size={28} />
                </div>

                <h1 className="text-3xl font-bold">
                  Ishop
                </h1>
              </div>

              <div className="mt-16">
                <h2 className="text-5xl font-bold leading-tight">
                  Create Your <br />
                  Shopping Account
                </h2>

                <p className="mt-5 text-white/80 text-lg leading-8">
                  Register now and explore amazing
                  products with exclusive offers.
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm">
              © 2026 Ishop. All rights reserved.
            </p>

            <div className="absolute -right-10 top-10 h-52 w-52 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-2xl"></div>
          </div>

          {/* Right */}
          <div className="p-8 md:p-14 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-4xl font-bold text-gray-900">
                Register
              </h2>

              <p className="text-gray-500 mt-2 mb-8">
                Create your new account
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                    placeholder="Enter your name"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-300 bg-gray-50 outline-none focus:border-[#0FA7A6] focus:ring-4 focus:ring-[#0FA7A6]/20 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
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
                    onChange={handleChange}
                    value={form.password}
                    placeholder="Create password"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-300 bg-gray-50 outline-none focus:border-[#0FA7A6] focus:ring-4 focus:ring-[#0FA7A6]/20 transition"
                  />
                </div>

                <button className="w-full h-14 rounded-2xl bg-[#0FA7A6] text-white font-semibold text-lg hover:opacity-90 transition shadow-lg shadow-[#0FA7A6]/30">
                  Create Account
                </button>
              </form>

              <p className="text-center text-gray-500 mt-8">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#0FA7A6] font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }