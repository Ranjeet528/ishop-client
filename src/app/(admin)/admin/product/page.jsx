"use client";

import { getProducts } from "@/api/server-api";
import React, { useEffect, useState } from "react";
import { FaEdit, FaImages } from "react-icons/fa";
import Link from "next/link";
import StatusBtn from "@/components/admin/StatusBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ProductViewModal from "@/components/admin/ViewButton";

export default function Product() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const res = await getProducts();

      setProducts(res?.data || []);
      setMeta(res?.meta || {});

      console.log("FULL RESPONSE:", res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <h2 className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </h2>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Product Management
          </h2>

          <p className="text-gray-500 text-sm">
            Manage products, category and status
          </p>
        </div>

        <Link href="/admin/product/add">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          {/* Head */}
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Thumbnail</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No Product Found
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Thumbnail */}
                  <td className="p-4">
                    <img
                      className="w-14 h-14 object-cover rounded-lg border"
                      src={
                        item.thumbnail
                          ? `${meta?.imageBaseUrl}/${item.thumbnail}`
                          : "https://via.placeholder.com/60"
                      }
                      alt={item.name}
                    />
                  </td>

                  {/* Name */}
                  <td className="p-4">
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>
                  </td>

                  {/* Category */}
                  <td className="p-4 text-gray-600">
                    {item.categoryId?.name}
                  </td>

                  {/* Brand */}
                  <td className="p-4 text-gray-600">
                    {item.brandId?.name}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <StatusBtn
                      value={item.status}
                      id={item._id}
                      field="status"
                    />
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {/* Add Images */}
                      <Link
                        href={`/admin/product/add_images/${item._id}`}
                      >
                        <button className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200">
                          <FaImages />
                        </button>
                      </Link>

                      {/* View */}
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setOpen(true);
                        }}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        👁
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/product/edit/${item._id}`}
                      >
                        <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                          <FaEdit />
                        </button>
                      </Link>

                      {/* Delete */}
                      <DeleteBtn id={item._id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Product View Modal */}
      <ProductViewModal
        isOpen={open}
        onClose={() => setOpen(false)}
        product={selectedProduct}
        baseUrl={meta?.imageBaseUrl}
      />
    </div>
  );
}