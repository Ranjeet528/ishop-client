import { getBrands } from '@/api/server-api';
import React from 'react';
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import StatusBtn from '@/components/admin/StatusBtn';
import DeleteBtn from '@/components/admin/DeleteBtn';

export default async function Brand() {

  let brands = [];
  let meta = {};

  try {
    const res = await getBrands();
    console.log(res);

    brands = res?.data || [];
   meta = res?.meta || {};

  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Brand Management
          </h2>

          <p className="text-gray-500 text-sm">
            Manage brands and categories
          </p>
        </div>

        <Link href="/admin/brand/add">
          <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-2.5 rounded-lg font-medium shadow-sm">
            + Add Brand
          </button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">

            {/* Table Header */}
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Logo</th>
                <th className="px-6 py-4">Brand Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              {brands.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No Brand Found
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr
                    key={brand._id}
                    className="border-t hover:bg-orange-50 transition"
                  >

                    {/* Logo */}
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 border flex items-center justify-center overflow-hidden">

                        <img
                          src={`${meta.imageBaseUrl || ""}${brand.image}`}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                        />

                      </div>
                    </td>

                    {/* Brand Name */}
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {brand.name}
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {brand.slug}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">

                        {brand.categoryId?.length > 0 ? (
                          brand.categoryId.map((cat) => (
                            <span
                              key={cat._id}
                              className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {cat.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No Category
                          </span>
                        )}

                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">

                        <StatusBtn
                          value={brand.status}
                          id={brand._id}
                          field="status"
                        />

                        <StatusBtn
                          value={brand.Is_home}
                          id={brand._id}
                          field="Is_home"
                        />

                        <StatusBtn
                          value={brand.Is_top}
                          id={brand._id}
                          field="Is_top"
                        />

                        <StatusBtn
                          value={brand.Is_popular}
                          id={brand._id}
                          field="Is_popular"
                        />

                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">

                        <Link href={`/admin/brand/edit/${brand._id}`}>
                          <button className="w-10 h-10 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-600 flex items-center justify-center transition">
                            <FaEdit />
                          </button>
                        </Link>

                        <DeleteBtn API={`brand/delete/${brand._id}`} />

                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}