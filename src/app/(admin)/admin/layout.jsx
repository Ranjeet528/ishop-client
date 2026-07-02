"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} h-screen flex bg-gray-100`}
    >
      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="dark"
        transition={Bounce}
      />

      {/* Sidebar width reserve */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          collapse ? "w-24" : "w-72"
        }`}
      >
        <Sidebar
          collapse={collapse}
          setCollapse={setCollapse}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar
          collapse={collapse}
          setCollapse={setCollapse}
        />
      </div>

      {/* Right section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}