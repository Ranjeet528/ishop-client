"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="w-full bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-[#0FA7A6] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-white/90">
            We’d love to hear from you. Get in touch with us anytime.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Get In Touch
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Have questions about products, orders, or support? 
              Fill out the form and our team will get back to you as soon as possible.
            </p>

            <div className="mt-10 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eef9f8] flex items-center justify-center">
                  <MapPin className="text-[#0FA7A6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">
                    257 Thatcher Road St, Brooklyn, Manhattan, NY 10092
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eef9f8] flex items-center justify-center">
                  <Phone className="text-[#0FA7A6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+1 202-555-0123</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eef9f8] flex items-center justify-center">
                  <Mail className="text-[#0FA7A6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">contact@swootechmart.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eef9f8] flex items-center justify-center">
                  <Clock className="text-[#0FA7A6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Working Hours</h3>
                  <p className="text-gray-600">
                    Mon - Sat: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side Form */}
          <div className="bg-[#f8f8f8] p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Message
            </h2>

            <form className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 outline-none focus:border-[#0FA7A6]"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 outline-none focus:border-[#0FA7A6]"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 outline-none focus:border-[#0FA7A6]"
                />
              </div>

              <div>
                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 outline-none resize-none focus:border-[#0FA7A6]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0FA7A6] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px]">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}