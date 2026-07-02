"use client"

import { getBrands } from "@/api/api-call";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function BrandFilter({brands}) {

  const router = useRouter();

  const searchParams = useSearchParams();
  const select_brand = searchParams.get("brand_slug")
  console.log(select_brand)


  function filterHandler(slug){
    const query = new URLSearchParams(searchParams.toString());
   
    if(slug == select_brand){
      query.delete("brand_slug")
    }else{
      query.set("brand_slug", slug)
    }
    router.push(`?${query.toString()}`,{ scroll: false })


  }
 

  return (
    <div className="bg-white rounded-[28px] p-5 shadow-sm mt-5">
      <h2 className="text-lg font-bold text-black mb-5">
        Brand
      </h2>

      <div className="space-y-3">
        {brands.map((brand) => (
         <label
              key={brand._id}
              onClick={() =>
                filterHandler(
                  brand.slug
                )
              }
          
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    select_brand ===
                    brand.slug
                  }
                  readOnly
                  className="w-5 h-5 accent-[#11B5B0] rounded-md cursor-pointer"
                />

              <span className="text-sm font-medium text-gray-700 group-hover:text-black transition">
                {brand.name}
              </span>
            </div>

            <span className="text-xs text-gray-400">
              {brand.count || 3}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}