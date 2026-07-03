import Image from "next/image";
import { getCategories } from "@/api/api-call";
import Link from "next/link";

export default async function CategorySidebar() {
  const category_response = await getCategories({limit:5,Is_home:true,status:true});
    if (!category_response?.success) {
    return null;
  }
  const baseUrl = category_response?.meta?.imageBaseUrl;
  const categories = category_response?.data || [];
  if (!categories.length) {
    return null;
  }
 

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm h-full">
      <h2 className="text-xl font-bold mb-5">
        Category
      </h2>

      <div className="space-y-3">
        {categories.map((item, index) => (
          <div
            key={item._id || index}
            className="flex items-center justify-between border rounded-xl px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              
              {/* Category Image */}
              <div className="w-12 h-12 rounded-xl overflow-hidden  bg-gray-100 flex items-center justify-center">
                <img
                  src={baseUrl+item.image || "/images/default-category.png"}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Name */}
              <Link href={`/products/${item.slug}`}>
              <span className="text-sm font-medium">
                {item.name}
              </span>
              </Link>
            </div>

            {/* Count */}
            <span className="min-w-7 h-7 px-2 rounded-full bg-[#11b5b0] text-white text-xs flex items-center justify-center">
              {item.count || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}