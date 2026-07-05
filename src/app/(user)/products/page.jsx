import TopBanner from "@/components/user/TopBanner";
import PopularCategories from "@/components/user/PopularCategories";

import FilterSidebar from "@/components/user/FilterSidebar";

import ProductCard from "@/components/user/ProductCard";
import ProductToolbar from "@/components/user/ProductToolbar";
import { getBrands,  getColors, getProducts,getCategories } from "@/api/server-api";


export default async function ProductsPage({searchParams}) { 
  const search_promise = await searchParams;
  // console.log(search_promise,"searchhhh")
 
  const brand_slug = search_promise.brand_slug || null;
  const color_slug = search_promise.color_slug || null;
  const minPrice = search_promise.min || null;
  const maxPrice = search_promise.max|| null;
  const sort = search_promise.sort|| "latest";

  

  // console.log(color_slug,"coloress")

  

   const [category_response, color_response, brand_response]= await Promise.all([
    getCategories({status:true}),
    getColors({status:true}),
    getBrands({status:true})
  ])
  const categories = category_response?.data || [];
  const brands = brand_response?.data || [];
  const colors = color_response?.data || [];

  

  const product_response = await getProducts({status:true, brand_slug,color_slug,minPrice,maxPrice,sort});
 
  const products = product_response.data;
  
 
  return (
    <div className="py-6">
      {/* Top Banner */}
      <TopBanner />

      {/* Popular Categories */}
      <PopularCategories />

      {/* Products Section */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        
        {/* Left Sidebar */}
        <div>
          <FilterSidebar categories={categories} brands={brands} colors={colors} />
        </div>

        {/* Right Products */}
        <div>
          {/* Toolbar */}
          <ProductToolbar />

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {products.map((prod) => {
              return(
                 <ProductCard 
                 key={prod._id} 
                  product ={prod}
                  imageBaseUrl={`${product_response?.meta?.imageBaseUrl}/${prod.thumbnail}`}
             

                  />
           


              )
            

              })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
            <button className="w-12 h-12 rounded-2xl bg-white shadow-sm font-semibold hover:bg-[#11B5B0] hover:text-white transition">
              1
            </button>

            <button className="w-12 h-12 rounded-2xl bg-[#11B5B0] text-white shadow-sm font-semibold">
              2
            </button>

            <button className="w-12 h-12 rounded-2xl bg-white shadow-sm font-semibold hover:bg-[#11B5B0] hover:text-white transition">
              3
            </button>

            <button className="px-5 h-12 rounded-2xl bg-white shadow-sm font-semibold hover:bg-black hover:text-white transition">
              Next →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}