"use client";

import React from "react";

export default function ProductViewModal({
  product,
  baseUrl,
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-xl relative overflow-y-auto max-h-[95vh]">

        {/* Close Btn */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600"
        >
          ✕
        </button>

        <div className="p-6">

          {/* Top Section */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left Side Images */}
            <div>
              {/* Main Image */}
              <div className="border rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={`${baseUrl}/${product?.thumbnail}`}
                  alt="product"
                  className="w-full h-[450px] object-cover"
                />
              </div>

              {/* Other Images */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product?.images?.map((img, index) => (
                  <div
                    key={index}
                    className="border rounded-xl overflow-hidden"
                  >
                    <img
                      src={`${baseUrl}/${img}`}
                      alt="other"
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {product?.name}
              </h1>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Category
                  </p>
                  <p className="font-semibold">
                    {product?.categoryId?.name}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Brand
                  </p>
                  <p className="font-semibold">
                    {product?.brandId?.name}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Original Price
                  </p>
                  <p className="text-red-500 line-through font-semibold">
                    ₹{product?.original_price}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Discount
                  </p>
                  <p className="font-semibold">
                    {product?.discountPercentage}%
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Final Price
                  </p>
                  <p className="font-semibold text-green-600">
                    ₹{product?.final_price}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      product?.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product?.status
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Stock
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      product?.stock
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product?.stock
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>

                {/* Colors */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">
                    Colors
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {product?.colorIds?.map(
                      (color, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                        >
                          {color?.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-5 rounded-2xl">
              <h2 className="text-lg font-semibold mb-3">
                Short Description
              </h2>

              <p className="text-gray-600 leading-7">
                {product?.short_description}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl">
              <h2 className="text-lg font-semibold mb-3">
                Long Description
              </h2>

              <p className="text-gray-600 leading-7">
                {product?.long_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}