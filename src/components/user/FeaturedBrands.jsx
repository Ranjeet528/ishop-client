import { getBrands } from "@/api/api-call";
 

export default async function FeaturedBrands() {
const brand_response = await getBrands({limit:20,status:true,Is_top:true});
const BaseUrl = brand_response?.meta?.imageBaseUrl;
const brands = brand_response?.data;


  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-[18px] font-bold text-gray-900">
          Featured Brands
        </h2>

        <button className="text-sm font-medium text-gray-500 hover:text-black transition">
          View All
        </button>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-3 sm:p-4 hover:shadow-md transition cursor-pointer rounded-2xl"
          >
            <img
              src={BaseUrl+brand.image}
              alt="brand"
              className="w-16 sm:w-20 h-10 sm:h-12 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}