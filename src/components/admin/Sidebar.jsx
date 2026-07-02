"use client";

import React from "react";
import {
  FaBars,
  FaFirstOrderAlt,
  FaProductHunt,
} from "react-icons/fa";
import { TbBrandAppgallery } from "react-icons/tb";
import {
  MdColorLens,
  MdDashboard,
  MdCategory,
} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  collapse,
  setCollapse,
}) {
  const pathname = usePathname();

  const items = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/admin" },
    { name: "Category", icon: <MdCategory />, path: "/admin/category" },
    { name: "Brand", icon: <TbBrandAppgallery />, path: "/admin/brand" },
    { name: "Color", icon: <MdColorLens />, path: "/admin/color" },
    { name: "Product", icon: <FaProductHunt />, path: "/admin/product" },
    { name: "Order", icon: <FaFirstOrderAlt />, path: "/admin/order" },
    { name: "Setting", icon: <IoMdSettings />, path: "/admin/setting" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-xl transition-all duration-300 flex flex-col z-40 ${
        collapse ? "w-24" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b">
        {!collapse && (
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              iShop Admin
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Management Panel
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapse(!collapse)}
          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-3">
        {items.map((item, index) => {
          const active = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition ${
                active
                  ? "bg-orange-500 text-white shadow-lg"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>

              {!collapse && (
                <span className="font-semibold">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div
          className={`flex items-center ${
            collapse ? "justify-center" : "gap-3"
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            R
          </div>

          {!collapse && (
            <div>
              <h4 className="font-semibold text-sm">
                Ranjeet
              </h4>
              <p className="text-xs text-gray-500">
                Super Admin
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}