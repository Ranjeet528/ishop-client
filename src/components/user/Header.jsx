"use client";

import Link from "next/link";
import {
  ChevronDown,
  Search,
  Menu,
  X,
  User,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, lsToCart } from "@/redux/features/cartSlice";
import { client } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function Header({ user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(lsToCart());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await client.post("/user/logout");

      if (response.data.success) {
        dispatch(emptyCart());
        localStorage.removeItem("cart");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isAdmin = ["admin", "superAdmin"].includes(user?.user?.role);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-40">
      {/* Top Bar */}
      <div className="hidden md:block border-b bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="bg-[#0FA7A6] text-white px-4 py-2 rounded-xl text-sm">
              Hotline 24/7
            </button>
            <span className="font-semibold">+91 9876543210</span>
          </div>

          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="#">Sell on Swoo</Link>
            <Link href="#">Order Tracking</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/images/Rectangle 2.png"
              alt="logo"
              className="w-12 md:w-16"
            />
            <div>
              <h2 className="font-bold text-sm md:text-lg">SWOO</h2>
              <h2 className="font-bold text-[#0FA7A6] text-sm md:text-lg">
                TECH MART
              </h2>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/">HOME</Link>
            <Link href="/pages">PAGES</Link>
            <Link href="/products">PRODUCTS</Link>
            <Link href="/contact">CONTACT</Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="bg-[#0FA7A6] text-white px-4 py-2 rounded-xl"
              >
                DASHBOARD
              </Link>
            )}
          </nav>

          {/* Desktop Right */}
         <div className="hidden lg:flex items-center gap-4"> {/* User */} <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-200 bg-white"> <div className="w-12 h-12 rounded-full bg-[#eef9f8] flex items-center justify-center"> <User size={20} className="text-[#0FA7A6]" /> </div> <div> <p className="uppercase text-gray-400 text-[11px]"> Welcome </p> {user?.user ? ( <div className="flex items-center gap-2"> <h3 className="font-bold text-[14px] text-gray-800"> {user.user.name} </h3> <button onClick={handleLogout} className="text-[#0FA7A6] text-sm hover:underline" > Logout </button> </div> ) : ( <Link href="/login"> <h3 className="font-bold text-[14px] hover:text-[#0FA7A6]"> Log In / Register </h3> </Link> )} </div> </div> {/* Cart */} <Link href="/cart"> <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-gray-200 bg-white cursor-pointer"> <div className="relative"> <div className="w-14 h-14 rounded-full bg-[#eef9f8] flex items-center justify-center"> <ShoppingCart size={24} className="text-[#0FA7A6]" /> </div> <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0FA7A6] text-white text-xs flex items-center justify-center"> {cart.items.length || 0} </span> </div> <div> <p className="uppercase text-gray-400 text-[11px]"> Shopping Cart </p> <h3 className="font-bold text-[16px]"> ₹ {cart.final_total || 0} </h3> </div> </div> </Link> </div>

          {/* Mobile Right */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            {/* Login/User */}
            {user?.user ? (
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center"
              >
                <LogOut size={18} className="text-red-500" />
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 rounded-lg bg-[#0FA7A6] text-white text-xs font-semibold"
              >
                Login
              </Link>
            )}

            {/* Admin Dashboard */}
            {isAdmin && (
              <Link
                href="/admin"
                className="w-10 h-10 rounded-full bg-[#eef9f8] flex items-center justify-center"
              >
                <LayoutDashboard
                  size={18}
                  className="text-[#0FA7A6]"
                />
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-10 h-10 rounded-full bg-[#eef9f8] flex items-center justify-center"
            >
              <ShoppingCart
                size={18}
                className="text-[#0FA7A6]"
              />
              <span className="absolute -top-1 -right-1 bg-[#0FA7A6] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {cart.items.length || 0}
              </span>
            </Link>

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 p-4 rounded-2xl border bg-white shadow-lg flex flex-col gap-4">
            <Link href="/">HOME</Link>
            <Link href="/pages">PAGES</Link>
            <Link href="/products">PRODUCTS</Link>
            <Link href="/contact">CONTACT</Link>

            {user?.user && (
              <div className="pt-3 border-t">
                <p className="text-sm text-gray-400">Logged in as</p>
                <h3 className="font-semibold">{user.user.name}</h3>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search */}
    {/* Bottom Search */} <div className="bg-[#0FA7A6] px-4 md:px-6 lg:px-8 py-4"> <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-4 justify-between items-center"> <div className="flex items-center bg-white rounded-full overflow-hidden w-full xl:w-[600px] h-[55px] shadow-md"> <div className="px-5 border-r border-gray-300 font-semibold text-sm whitespace-nowrap"> All Categories </div> <div className="flex items-center justify-between w-full px-4"> <input type="text" placeholder="Search anything..." className="w-full outline-none text-sm" /> <div className="w-10 h-10 rounded-full bg-[#0FA7A6] flex items-center justify-center cursor-pointer"> <Search size={20} className="text-white" /> </div> </div> </div> <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium uppercase"> <span>Free Shipping Over ₹199</span> <span>30 Days Money Back</span> <span>100% Secure Payment</span> </div> </div> </div> </header>
  );
}