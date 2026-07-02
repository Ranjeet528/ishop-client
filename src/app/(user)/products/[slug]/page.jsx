import TopBanner from "@/components/user/TopBanner";
import PopularCategories from "@/components/user/PopularCategories";
import FilterSidebar from "@/components/user/FilterSidebar";
import ProductCard from "@/components/user/ProductCard";
import ProductToolbar from "@/components/user/ProductToolbar";
import {
  
  getCategories
 
  
} from "@/api/server-api";

import {
  getBrands,

  getColors,
  getProducts,
} from "@/api/api-call";

export default async function ProductsPage({
  params, searchParams
}) {
  const resolvedParams = await params;

  const category_slug = resolvedParams?.slug;

   const search_promise = await searchParams;
  const brand_slug = search_promise.brand_slug || null
  const color_slug = search_promise.color_slug || null

  const [
    category_response,
    color_response,
    brand_response,
    product_response,
  ] = await Promise.all([
    getCategories({
      status: true,
    }),
    getColors({
      status: true,
    }),
    getBrands({
      status: true,
    }),
    getProducts({
      status: true,
      category_slug,
      brand_slug,
      color_slug
    }),
  ]);

  const categories =
    category_response?.data || [];

  const brands =
    brand_response?.data || [];

  const colors =
    color_response?.data || [];

  const products =
    product_response?.data || [];

  return (
    <div className="py-6">
      <TopBanner />

      <PopularCategories />

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Sidebar */}
        <div>
          <FilterSidebar
            categories={categories}
            brands={brands}
            colors={colors}
          />
        </div>

        {/* Products */}
        <div>
          <ProductToolbar />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {products.map((prod) => (
              <ProductCard
                key={prod._id}
                product={prod}
                imageBaseUrl={`${product_response?.meta?.imageBaseUrl}/${prod.thumbnail}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}