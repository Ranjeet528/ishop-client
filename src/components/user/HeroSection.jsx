import CategorySidebar from "./CategorySidebar";

import FeaturedBrands from "./FeaturedBrands";
import MainSlider from "./MainSlider";
import TopCategories from "./TopCategories";

export default function HeroSection() {
  return (
    <section className="bg-[#f5f6f8] w-full px-4 lg:px-8 py-5">
      <div className=" max-w-[1400px] mx-auto flex flex-col gap-5">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
          
          {/* Category Sidebar - 30% */}
          <div className="lg:col-span-3">
            <CategorySidebar />
          </div>

          {/* Main Slider - 70% */}
          <div className="lg:col-span-7">
            <MainSlider />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Featured Brands - 50% */}
          <FeaturedBrands />

          {/* Top Categories - 50% */}
          <TopCategories />
          {/* Deals of the day*/}
         

        </div>
      </div>
    </section>
  );
}