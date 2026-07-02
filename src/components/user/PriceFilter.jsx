"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("min")) || 0
  );

  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max")) || 2500
  );

  function handleMinChange(value) {
    const newMin = Number(value);

    if (newMin <= maxPrice) {
      setMinPrice(newMin);
    }
  }

  function handleMaxChange(value) {
    const newMax = Number(value);

    if (newMax >= minPrice) {
      setMaxPrice(newMax);
    }
  }

  function applyFilter() {
    const query = new URLSearchParams(
      searchParams.toString()
    );

    query.set("min", minPrice);
    query.set("max", maxPrice);

    router.push(
      `?${query.toString()}`,
      { scroll: false }
    );
  }

  function resetFilter() {
    const query = new URLSearchParams(
      searchParams.toString()
    );

    query.delete("min");
    query.delete("max");

    router.push(
      `?${query.toString()}`,
      { scroll: false }
    );

    setMinPrice(0);
    setMaxPrice(2500);
  }

  return (
    <div className="bg-white rounded-[28px] p-5 shadow-sm mt-5">
      {/* Heading */}
      <h2 className="text-lg font-bold text-black mb-5">
        Price Range
      </h2>

      {/* Price Value */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Price
        </span>

        <span className="font-semibold text-[#11B5B0]">
          ₹{minPrice} - ₹{maxPrice}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100000"
        value={maxPrice}
        onChange={(e) =>
          handleMaxChange(e.target.value)
        }
        className="w-full accent-[#11B5B0] cursor-pointer"
      />

      {/* Min Max */}
      <div className="flex gap-3 mt-5">
        <div className="flex-1">
          <label className="text-xs text-gray-400 mb-1 block">
            Min
          </label>

          <input
            type="number"
            value={minPrice}
            onChange={(e) =>
              handleMinChange(e.target.value)
            }
            placeholder="0"
            className="w-full bg-[#F4F7F8] rounded-2xl px-4 py-3 outline-none text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="text-xs text-gray-400 mb-1 block">
            Max
          </label>

          <input
            type="number"
            value={maxPrice}
            onChange={(e) =>
              handleMaxChange(e.target.value)
            }
            placeholder="100000"
            className="w-full bg-[#F4F7F8] rounded-2xl px-4 py-3 outline-none text-sm"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={applyFilter}
          className="w-full mt-5 bg-[#11B5B0] cursor-pointer text-white rounded-2xl py-3 font-semibold hover:opacity-90 transition"
        >
          Apply Filter
        </button>

        <button
          onClick={resetFilter}
          className="w-full mt-5 bg-gray-400 cursor-pointer text-white rounded-2xl py-3 font-semibold hover:opacity-90 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}