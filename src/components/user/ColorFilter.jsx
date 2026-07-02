
"use client"
import { useRouter, useSearchParams } from "next/navigation";

export default function ColorFilter({
  colors 
}) {
  
  const router = useRouter()
  const searchParams = useSearchParams();
  let select_colors = searchParams.get("color_slug")?.split(",") || [];
  console.log(select_colors)


  function filterHandler(slug){
   
    let updatedColors = [];

    if( select_colors.includes(slug)){
      updatedColors = select_colors.filter((c)=> c !== slug)
    }else{
     updatedColors = [...select_colors, slug];
    }
    const query = new URLSearchParams(searchParams.toString());
    if(updatedColors.length > 0 ){
      query.set("color_slug",updatedColors.join(","));
    }else{
      query.delete("color_slug");
      
    }

    router.push(`?${query.toString()}`,{scroll: false})
  }

  return (
    <div className="bg-white rounded-[28px] p-5 shadow-sm mt-5">
      {/* Heading */}
      <h2 className="text-lg font-bold text-black mb-5">
        Color
      </h2>

      {/* Colors */}
      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => (
          <button
          onClick={()=> filterHandler(color.slug)}
            key={color._id || index}
            className="w-11 h-11 rounded-full border hover:scale-105 transition"
            style={{
              backgroundColor:
               color.color_code,
            }}
          >
            {/* White color ke liye border */}
            {color.code ===
              "#ffffff" && (
              <div className="w-full h-full rounded-full border border-gray-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}