"use client";

import { getSingleOrder, updateOrderStatus } from "@/api/api-call";
import React, { useEffect, useState } from "react";
import { use } from "react";

export default function OrderDetail({ params }) {
  const { id } = use(params);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchOrder() {
    try {
      const res = await getSingleOrder(id);
      setOrder(res.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(status) {
    try {
      await updateOrderStatus(id, { orderStatus: status });
      fetchOrder();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return (
      <h2 className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </h2>
    );
  }

  if (!order) {
    return (
      <h2 className="text-center mt-10 text-red-500">
        Order not found
      </h2>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Order #{order._id.slice(-6)}
          </h2>
          <p className="text-gray-500 text-sm">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <select
          value={order.orderStatus}
          onChange={(e) =>
            handleStatusChange(e.target.value)
          }
          className="border px-4 py-2 rounded-lg"
        >
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">
            Out for Delivery
          </option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="return_requested">
            Return Requested
          </option>
        </select>
      </div>

      {/* Customer */}
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-lg font-bold mb-4">
          Customer Details
        </h3>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong> {order.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user?.email}
          </p>
          <p>
            <strong>Mobile:</strong> {order.user?.mobile}
          </p>
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-lg font-bold mb-4">
          Shipping Address
        </h3>

        <div className="space-y-2 text-gray-700">
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.mobile}</p>
          <p>{order.shippingAddress.addressLine}</p>
          <p>
            {order.shippingAddress.city},{" "}
            {order.shippingAddress.state}
          </p>
          <p>{order.shippingAddress.pincode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>
      </div>

      {/* Products */}
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-lg font-bold mb-4">
          Ordered Products
        </h3>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId?.thumbnail}
                  alt={item.productId?.name}
                  className="w-16 h-16 rounded-lg object-cover border"
                />

                <div>
                  <h4 className="font-semibold">
                    {item.productId?.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </p>
                </div>
              </div>

              <div className="font-semibold">
                ₹ {item.total}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-lg font-bold mb-4">
          Payment Info
        </h3>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Method:</strong>{" "}
            {order.paymentMethod.toUpperCase()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {order.paymentStatus}
          </p>
          <p>
            <strong>Total:</strong> ₹{" "}
            {order.totalAmount}
          </p>

          {order.razorpay_payment_id && (
            <p>
              <strong>Payment ID:</strong>{" "}
              {order.razorpay_payment_id}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}