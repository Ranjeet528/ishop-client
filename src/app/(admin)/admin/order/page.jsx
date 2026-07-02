"use client";

import { getOrders } from "@/api/api-call";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {

    try {
      const res = await getOrders();
      setOrders(res?.orders || []);
      console.log("ORDERS:", res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Order Management
        </h2>

        <p className="text-gray-500 text-sm">
          Manage all customer orders
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          {/* Head */}
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Payment Status</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-6 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((item) => {
               
                return (
                
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Order ID */}
                  <td className="p-4 font-medium">
                    #{item._id.slice(-6)}
                  </td>

                  {/* Customer */}
                  <td className="p-4">
                    <div>
                      <h3 className="font-semibold">
                        {item.user?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.user?.email}
                      </p>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-4 font-semibold text-green-600">
                    ₹ {item.totalAmount}
                  </td>

                  {/* Payment Method */}
                  <td className="p-4 uppercase">
                    {item.paymentMethod}
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                      {item.orderStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-600">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <Link
                        href={`/admin/order/${item._id}`}
                      >
                        <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                          👁
                        </button>
                      </Link>

                      {/* Update Status */}
                     <Link href={`/admin/order/invoice/${item._id}`}>
  <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
    🧾
  </button>
</Link>
                    </div>
                  </td>
                </tr>
              )
})
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}