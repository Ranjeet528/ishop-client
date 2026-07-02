import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryFilter({
  categories,
}) {
  const pathname = usePathname();
  return (
    <div className="bg-white rounded-[28px] p-5 shadow-sm">
      {/* Heading */}
      <h2 className="text-lg font-bold text-black mb-5">
        Category
      </h2>

      {/* All Categories */}
      <Link
        href="/products"
        scroll={false}
        className="w-full bg-[#11B5B0] text-white rounded-2xl py-3 font-semibold hover:opacity-90 transition mb-5 flex items-center justify-center"
      >
        All Categories
      </Link>

      {/* Categories */}
      <div className="space-y-2">
        {categories.map((item) => (
          <Link
            key={item._id}
            href={`/products/${item.slug}`}
            scroll={false}
            className={`   flex ${ pathname == "/products/" + item.slug ?  "bg-teal-300" : "" } w-full items-center justify-between px-4 py-3 rounded-2xl text-gray-700  hover:text-black transition text-sm font-medium `}
          >
            <span>{item.name}</span>

            <span className="text-gray-400 text-xs">
              {Math.floor(
                Math.random() * 100
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}