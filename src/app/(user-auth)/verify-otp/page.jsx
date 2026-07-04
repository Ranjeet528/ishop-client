"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { client, notify } from "@/utils/helper";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return notify("Please enter valid OTP", false);
    }

    setLoading(true);

    client
      .post("user/verify-otp", {
        otp: finalOtp,
        email,
      })
      .then((response) => {
        notify(response.data.message, response.data.success);

        if (response.data.success) {
          router.push("/login");
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message || "Internal Server Error";

        notify(message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#E8F8F8] via-white to-[#D9F3F2] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-[32px] p-10 shadow-[0_20px_80px_rgba(15,167,166,0.15)] text-center">
        <div className="w-20 h-20 rounded-full bg-[#0FA7A6]/10 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={38} className="text-[#0FA7A6]" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900">Verify OTP</h1>

        <p className="text-gray-500 mt-3 leading-7">
          We have sent a 6-digit verification code to your registered email address.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-16 md:w-16 md:h-18 rounded-2xl border border-gray-300 bg-gray-50 text-center text-2xl font-bold outline-none focus:border-[#0FA7A6] focus:ring-4 focus:ring-[#0FA7A6]/20 transition"
              />
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full h-14 mt-8 rounded-2xl bg-[#0FA7A6] text-white font-semibold text-lg hover:opacity-90 transition shadow-lg shadow-[#0FA7A6]/30"
          >
            Verify OTP
          </button>
        </form>

        <p className="mt-6 text-gray-500">
          Didn&apos;t receive code?{" "}
          <button className="text-[#0FA7A6] font-semibold hover:underline">
            Resend OTP
          </button>
        </p>

        <Link
          href="/login"
          className="inline-block mt-6 text-sm text-gray-500 hover:text-[#0FA7A6]"
        >
          Back to Login
        </Link>
      </div>
    </section>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}