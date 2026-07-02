import { getColors } from "@/api/api-call";
import React from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import StatusBtn from "@/components/admin/StatusBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function Color() {
  let colors = [];

  try {
    const res = await getColors();
    console.log(res);

    colors = res?.data || [];
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Color Management
          </h2>

          <p className="text-gray-500 text-sm">
            Manage product colors
          </p>
        </div>

        <Link href="/admin/color/add">
          <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-2.5 rounded-lg font-medium shadow-sm">
            + Add Color
          </button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">

            {/* Table Header */}
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Color</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Hex</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              {colors.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No Color Found
                  </td>
                </tr>
              ) : (
                colors.map((color) => (
                  <tr
                    key={color._id}
                    className="border-t hover:bg-orange-50 transition"
                  >

                    {/* Color Preview */}
                    <td className="px-6 py-4">
                      <div
                        className="w-10 h-10 rounded-lg border shadow-sm"
                        style={{ backgroundColor: color.color_code}}
                      />
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {color.name}
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {color.slug}
                    </td>

                    {/* Hex */}
                    <td className="px-6 py-4 text-gray-500 text-sm font-medium">
                      {color.color_code}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBtn
                        value={color.status}
                        id={color._id}
                        field="status"
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">

                        <Link href={`/admin/color/edit/${color._id}`}>
                          <button className="w-10 h-10 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-600 flex items-center justify-center transition">
                            <FaEdit />
                          </button>
                        </Link>

                        <DeleteBtn API={`color/delete/${color._id}`} />

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