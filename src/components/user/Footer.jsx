"use client";

import { Phone, MapPin, Mail, ChevronDown } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] w-full border-t mt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Left Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-bold text-lg uppercase leading-7 text-black">
              SWOO - 1ST NYC TECH ONLINE MARKET
            </h2>

            <div className="mt-6">
              <p className="text-sm text-gray-500 uppercase">
                Hotline 24/7
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mt-2">
                (025) 3686 25 16
              </h3>
            </div>

            <div className="mt-6 space-y-4 text-gray-600 text-sm">
              <div className="flex gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <p>
                  257 Thatcher Road St, Brooklyn,
                  Manhattan, NY 10092
                </p>
              </div>

              <div className="flex gap-2">
                <Mail size={18} className="shrink-0" />
                <p>contact@swootechmart.com</p>
              </div>

              <div className="flex gap-2">
                <Phone size={18} className="shrink-0" />
                <p>+1 202-555-0123</p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-7 flex-wrap">
              {[
                <FaTwitter key="t" size={16} />,
                <FaFacebookF key="f" size={16} />,
                <FaInstagram key="i" size={16} />,
                <FaYoutube key="y" size={16} />,
              ].map((icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition flex items-center justify-center"
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* Currency */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button className="bg-white border rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
                USD <ChevronDown size={16} />
              </button>

              <button className="bg-white border rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
                🇺🇸 ENG <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Links Sections */}
          {[
            {
              title: "Top Categories",
              items: [
                "Laptops",
                "PC & Computers",
                "Cell Phones",
                "Tablets",
                "Gaming & VR",
                "Networks",
              ],
            },
            {
              title: "Company",
              items: [
                "About Swoo",
                "Contact",
                "Career",
                "Blog",
                "Sitemap",
              ],
            },
            {
              title: "Help Center",
              items: [
                "Customer Service",
                "Policy",
                "Terms & Conditions",
                "Track Order",
                "FAQs",
              ],
            },
            {
              title: "Partner",
              items: [
                "Become Seller",
                "Affiliate",
                "Advertise",
                "Partnership",
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-5 uppercase">
                {section.title}
              </h3>

              <ul className="space-y-3 text-gray-600 text-sm">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="hover:text-black cursor-pointer transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Subscribe */}
        <div className="mt-14 max-w-3xl mx-auto text-center lg:text-left">
          <h2 className="font-bold text-xl sm:text-2xl leading-snug">
            SUBSCRIBE & GET{" "}
            <span className="text-orange-500">10% OFF</span>{" "}
            FOR YOUR FIRST ORDER
          </h2>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent border-b border-gray-300 outline-none py-3 placeholder:text-gray-500"
            />

            <button className="text-orange-500 font-semibold whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-3 italic">
            By subscribing, you're accepted our Policy
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-14 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-sm text-gray-500 text-center lg:text-left">
          
          <p>
            © 2024{" "}
            <span className="font-semibold text-black">
              Shawonetc3
            </span>{" "}
            . All Rights Reserved
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold text-gray-700">
            <span>PayPal</span>
            <span>MasterCard</span>
            <span>Visa</span>
            <span>Stripe</span>
            <span>Klarna</span>
          </div>

          <button className="text-blue-500 hover:underline">
            Mobile Site
          </button>
        </div>
      </div>
    </footer>
  );
}