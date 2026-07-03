import { getCategories } from "@/api/api-call";


export default async function PopularCategories() {
   const category_response = await getCategories({limit:6,Is_popular:true,status:true});
  const UrlBase = category_response?.meta?.imageBaseUrl;
  const categories = category_response?.data || []
  return (
    <section className="mt-6">
      {/* Heading */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-black">
            Popular Categories
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Browse top smartphone categories
          </p>
        </div>

        <button className="text-[#11B5B0] font-medium hover:underline text-sm">
          View All
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-[24px] p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#11B5B0]/20"
          >
            {/* Image */}
            <div className=" rounded-2xl h-[120px] flex items-center justify-center overflow-hidden">
              <img
                src={ UrlBase+item.image}
                alt={item.name}
                className="h-[110px] object-contain group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Text */}
            <div className="mt-4 text-center">
              <h3 className="font-semibold text-sm md:text-base text-black line-clamp-1">
                {item.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                4 items
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}