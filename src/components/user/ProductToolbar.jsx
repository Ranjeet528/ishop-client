"use client";

import { Grid3X3, List } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProductToolbar() {

  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get("sort") || "latest";

  function filterHandler(e){
    const value = e.target.value;
    // console.log(value,"value")

    const query = new URLSearchParams(params.toString());
    if(value == "latest"){
      query.delete("sort")
    }else{
      query.set("sort", value)
    }
    router.push(`?${query.toString()}`,{scroll:false})


  }

  return (
    <div className="bg-white rounded-[30px] p-4 md:p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
      {/* Left */}
      <div>
        <h2 className="text-lg font-bold text-black">
          Products
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Showing{" "}
          <span className="font-semibold text-black">
            1–12
          </span>{" "}
          of{" "}
          <span className="font-semibold text-black">
            120
          </span>{" "}
          products
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Sort by:
          </span>

          <select
          onChange={filterHandler}
          className="bg-[#F5F7F9] rounded-2xl px-4 py-3 outline-none text-sm font-medium cursor-pointer">
            <option value="latest">Latest</option>
            <option value="asc">Low Price</option>
            <option value="dasc">High Price</option>
            <option value="popularity">Popularity</option>
            
          </select>
        </div>

        {/* View Buttons */}
        <div className="flex items-center gap-2">
          <button className="w-12 h-12 rounded-2xl bg-[#11B5B0] text-white flex items-center justify-center transition">
            <Grid3X3 size={20} />
          </button>

          <button className="w-12 h-12 rounded-2xl bg-[#F5F7F9] hover:bg-black hover:text-white flex items-center justify-center transition">
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}