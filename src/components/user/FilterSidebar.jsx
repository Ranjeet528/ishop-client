
"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import BrandFilter from "./BrandFilter";


export default function FilterSidebar({categories, colors, brands}) {


  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Buttons */}
      <div className="lg:hidden flex items-center gap-3 mb-4">
        <button
          onClick={() => setOpen(true)}
          className="flex-1 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center gap-2 font-semibold"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <button className="flex-1 h-12 rounded-2xl bg-white shadow-sm font-semibold">
          Sort By
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-[#f7f7f7] overflow-y-auto p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 bg-white rounded-[22px] p-4 shadow-sm">
              <div>
                <h2 className="text-xl font-bold">
                  Filters
                </h2>

                <p className="text-sm text-gray-500">
                  Refine your search
                </p>
              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filters */}
            <CategoryFilter categories={categories} />
            <PriceFilter />
            <ColorFilter colors={colors}/>
            <BrandFilter brands={brands} />

            {/* Apply Button */}
            <button
              onClick={() =>
                setOpen(false)
              }
              className="w-full h-14 rounded-2xl bg-[#11B5B0] text-white font-semibold mt-5"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-5">
        {/* Heading */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm mb-5">
          <h2 className="text-xl font-bold">
            Filters
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Refine products
          </p>
        </div>

        <CategoryFilter categories={categories} />
        <PriceFilter />
        <ColorFilter colors={colors} />
        <BrandFilter  brands={brands} />
      </aside>
    </>
  );
}