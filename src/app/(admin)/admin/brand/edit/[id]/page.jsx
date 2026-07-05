import React from "react";
import Link from "next/link";
import { getBrands } from "@/api/server-api";

export default async function EditBrand({ params }) {
  const { id } = await params;

  let brand = {};
  let meta = {};

  try {
    const res = await getBrands();

    const brands = res?.data || [];

    brand = brands.find(
      (item) => item._id === id
    );

    meta = res || {};
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Edit Brand
          </h2>

          <p className="text-gray-500 text-sm">
            Update brand details
          </p>
        </div>

        <Link href="/admin/brand">
          <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition">
            Back
          </button>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">

        <form className="space-y-6">

          {/* Brand Name + Slug */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>

              <input
                type="text"
                defaultValue={brand?.name}
                placeholder="Enter brand name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>

              <input
                type="text"
                defaultValue={brand?.slug}
                placeholder="brand-slug"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400">

              <option>
                {brand?.categoryId?.[0]?.name ||
                  "Select Category"}
              </option>

            </select>
          </div>

          {/* Current Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current Logo
            </label>

            <div className="flex items-center gap-4">

              {brand?.image && (
                <img
                  src={`${meta?.imageBaseUrl || ""}${brand.image}`}
                  alt={brand?.name}
                  className="w-24 h-24 rounded-2xl border object-cover"
                />
              )}

              <div>
                <p className="text-sm text-gray-500">
                  Upload new image if needed
                </p>

                <input
                  type="file"
                  className="mt-3"
                />
              </div>

            </div>
          </div>

          {/* Status Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Brand Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Status</span>

                <input
                  type="checkbox"
                  defaultChecked={brand?.status}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Show on Home</span>

                <input
                  type="checkbox"
                  defaultChecked={brand?.Is_home}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Top Brand</span>

                <input
                  type="checkbox"
                  defaultChecked={brand?.Is_top}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Popular Brand</span>

                <input
                  type="checkbox"
                  defaultChecked={brand?.Is_popular}
                  className="w-5 h-5"
                />
              </label>

            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Update Brand
            </button>

            <Link href="/admin/brand">
              <button
                type="button"
                className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </Link>

          </div>

        </form>
      </div>
    </div>
  );
}