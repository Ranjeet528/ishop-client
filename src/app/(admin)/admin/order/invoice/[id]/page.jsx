"use client";

import React, { useEffect, useState, use } from "react";
import { getSingleOrder } from "@/api/api-call";
import {
    FaDownload,
    FaPrint,
    FaShoppingBag,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaGlobe,
    FaUserCircle,
    FaTruck,
} from "react-icons/fa";

export default function InvoicePage({ params }) {
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

    useEffect(() => {
        fetchOrder();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex flex-col gap-3 justify-center items-center">
                <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-400">
                    Loading invoice…
                </p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="h-screen flex flex-col gap-2 justify-center items-center">
                <p className="text-lg font-semibold text-red-500">
                    Order not found
                </p>
                <p className="text-sm text-gray-400">
                    The invoice you're looking for doesn't exist.
                </p>
            </div>
        );
    }

    const totalQty = order.items.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = order.items.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="bg-[#f0f1f6] min-h-screen py-8 px-4 print:bg-white print:p-0">
            <div className="max-w-3xl mx-auto">
                {/* Action Bar */}
                <div className="flex justify-end gap-2 mb-4 print:hidden">
                    <button className="px-4 py-2 border border-gray-200 rounded-md bg-white flex items-center gap-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                        <FaDownload className="text-[10px]" />
                        Download PDF
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 border border-gray-200 rounded-md bg-white flex items-center gap-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <FaPrint className="text-[10px]" />
                        Print Invoice
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-100 overflow-hidden print:shadow-none print:ring-0">
                    {/* Accent strip */}
                    <div className="h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600" />

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-6 px-7 pt-6 pb-5 border-b border-dashed border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-violet-600 flex items-center justify-center text-white text-base">
                                <FaShoppingBag />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold leading-tight text-gray-900">
                                    Your <span className="text-violet-600">Store</span>
                                </h1>
                                <p className="text-gray-400 text-xs">
                                    Quality Products, Happy Customers
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                INVOICE
                            </h1>
                            <p className="text-xs font-mono text-gray-400 mt-0.5">
                                INV-{order._id.slice(-6).toUpperCase()}
                            </p>
                        </div>
                    </div>

                    {/* Meta strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 text-xs">
                        <div className="bg-white px-5 py-3">
                            <p className="text-gray-400 mb-0.5">Order Date</p>
                            <p className="font-semibold text-gray-700">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="bg-white px-5 py-3">
                            <p className="text-gray-400 mb-0.5">Payment</p>
                            <p className="font-semibold text-gray-700">
                                {order.paymentMethod}
                            </p>
                        </div>
                        <div className="bg-white px-5 py-3">
                            <p className="text-gray-400 mb-0.5">Payment Status</p>
                            <span className="inline-block text-green-700 bg-green-50 px-2 py-0.5 rounded text-[11px] font-bold">
                                {order.paymentStatus}
                            </span>
                        </div>
                        <div className="bg-white px-5 py-3">
                            <p className="text-gray-400 mb-0.5">Order Status</p>
                            <span className="inline-block text-violet-700 bg-violet-50 px-2 py-0.5 rounded text-[11px] font-bold">
                                {order.orderStatus}
                            </span>
                        </div>
                    </div>

                    {/* Bill To / Shipping */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-7 py-5 border-b border-dashed border-gray-200">
                        <div>
                            <h3 className="text-gray-400 font-semibold text-[11px] tracking-wider uppercase flex gap-1.5 items-center mb-2">
                                <FaUserCircle className="text-violet-500" /> Bill To
                            </h3>
                            <p className="font-bold text-sm text-gray-900">
                                {order.user?.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {order.user?.email} · +91 {order.user?.mobile}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-gray-400 font-semibold text-[11px] tracking-wider uppercase flex gap-1.5 items-center mb-2">
                                <FaTruck className="text-violet-500" /> Ship To
                            </h3>
                            <p className="font-bold text-sm text-gray-900">
                                {order.shippingAddress?.fullName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                {order.shippingAddress?.addressLine},{" "}
                                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                                - {order.shippingAddress?.pincode},{" "}
                                {order.shippingAddress?.country}
                                <br />
                                +91 {order.shippingAddress?.mobile}
                            </p>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="px-7 py-5">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-200">
                                    <th className="py-2 text-left font-semibold w-[8%]">
                                        #
                                    </th>
                                    <th className="py-2 text-left font-semibold w-[44%]">
                                        Product
                                    </th>
                                    <th className="py-2 text-center font-semibold w-[16%]">
                                        Price
                                    </th>
                                    <th className="py-2 text-center font-semibold w-[12%]">
                                        Qty
                                    </th>
                                    <th className="py-2 text-right font-semibold w-[20%]">
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.items.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className="border-b border-gray-100 last:border-0"
                                    >
                                        <td className="py-3 text-gray-400 font-medium">
                                            {index + 1}
                                        </td>

                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.productId?.thumbnail}
                                                    alt={item.productId?.name}
                                                    className="w-10 h-10 rounded-md object-cover border border-gray-100 shrink-0"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm leading-tight">
                                                        {item.productId?.name}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400">
                                                        #{item.productId?._id?.slice(-8)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3 text-center text-gray-600">
                                            ₹{item.productId?.price}
                                        </td>

                                        <td className="py-3 text-center text-gray-600">
                                            {item.qty}
                                        </td>

                                        <td className="py-3 text-right font-bold text-gray-900">
                                            ₹{item.total}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals + Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-7 pb-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 self-start">
                            <p className="font-semibold text-gray-700 mb-1">Note</p>
                            Thank you for shopping with us. Items: {order.items.length} ·
                            Quantity: {totalQty}
                        </div>

                        <div className="text-sm">
                            <div className="flex justify-between py-1.5 text-gray-500">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between py-1.5 text-gray-500">
                                <span>Discount</span>
                                <span>- ₹0</span>
                            </div>
                            <div className="flex justify-between py-1.5 text-gray-500 border-b border-dashed border-gray-200">
                                <span>Shipping</span>
                                <span>₹0</span>
                            </div>
                            <div className="flex justify-between items-center pt-3">
                                <span className="font-bold text-gray-900">
                                    Total Amount
                                </span>
                                <span className="font-extrabold text-2xl text-violet-600">
                                    ₹{order.totalAmount}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-gray-200 px-7 py-4 bg-gray-50/60">
                        <p
                            style={{ fontFamily: "cursive" }}
                            className="text-2xl text-gray-700"
                        >
                            Ranjeet
                        </p>
                        <p className="text-xs text-gray-400 text-right">
                            Thank you for your purchase 💜
                        </p>
                    </div>

                    {/* Store contact strip */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-gray-100 px-7 py-3 text-[11px] text-gray-400 print:hidden">
                        <span className="flex items-center gap-1">
                            <FaMapMarkerAlt /> Rajasthan, India
                        </span>
                        <span className="flex items-center gap-1">
                            <FaPhone /> +91 98765 43210
                        </span>
                        <span className="flex items-center gap-1">
                            <FaEnvelope /> support@yourstore.com
                        </span>
                        <span className="flex items-center gap-1">
                            <FaGlobe /> www.yourstore.com
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}