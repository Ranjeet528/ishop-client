import { getCategories } from "@/api/server-api";



export default async function TopCategories() {
  const category_response = await getCategories({limit:4,Is_home:true,status:true});
  const UrlBase = category_response?.meta?.imageBaseUrl;
  const categories = category_response?.data || []
 
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm h-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-base sm:text-lg">
          Top Categories
        </h2>

        <button className="text-sm text-gray-500 hover:text-black transition">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-3 sm:p-4 text-center hover:shadow-md cursor-pointer transition"
          >
            <img
              src={UrlBase + item.image}
              alt={item}
              className="w-14 sm:w-16 md:w-20 mx-auto object-contain"
            />

            <h3 className="text-xs sm:text-sm font-medium mt-3">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}