"use client";

import React from "react";
import {
  FaSearch,
  FaBell,
  FaMoon,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full h-[90px] bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shadow-md sticky top-0 z-40">
      
      {/* Left */}
      <div className="flex items-center gap-10">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 leading-none">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your store
          </p>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-2xl px-5 py-3 w-[420px] border border-gray-200 focus-within:border-blue-500 transition">
          <FaSearch className="text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search products, orders, users..."
            className="bg-transparent outline-none ml-4 w-full text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        
        {/* Dark Mode */}
        <button className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <FaMoon className="text-gray-600 text-lg" />
        </button>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <FaBell className="text-gray-600 text-lg" />
          </div>

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] px-2 py-0.5 rounded-full font-medium">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 border-l pl-5">
          <FaUserCircle className="text-5xl text-gray-500" />

          <div className="hidden md:block">
            <h4 className="font-semibold text-gray-800 text-sm">
              Ranjeet
            </h4>
            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>
        </div>

        {/* Logout */}
        <button className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center hover:bg-red-200 transition">
          <FaSignOutAlt className="text-red-600 text-lg" />
        </button>
      </div>
    </header>
  );
}