"use client";

import { getDashboardData } from "@/api/api-call";
import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaTags,
  FaLayerGroup,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);

  async function fetchDashboard() {
    try {
      const res = await getDashboardData();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#9333ea",
  ];

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${data.totalRevenue}`,
      icon: <FaRupeeSign />,
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <FaShoppingCart />,
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: <FaBox />,
    },
    {
      title: "Users",
      value: data.totalUsers,
      icon: <FaUsers />,
    },
    {
      title: "Categories",
      value: data.totalCategories,
      icon: <FaLayerGroup />,
    },
    {
      title: "Brands",
      value: data.totalBrands,
      icon: <FaTags />,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* top cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-500 text-sm">
                {card.title}
              </h3>
              <span className="text-2xl text-blue-600">
                {card.icon}
              </span>
            </div>

            <h2 className="text-2xl font-bold">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* revenue cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <p>Today Revenue</p>
          <h2 className="text-2xl font-bold">
            ₹{data.todayRevenue}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Weekly Revenue</p>
          <h2 className="text-2xl font-bold">
            ₹{data.weeklyRevenue}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Monthly Revenue</p>
          <h2 className="text-2xl font-bold">
            ₹{data.monthlyRevenue}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Yearly Revenue</p>
          <h2 className="text-2xl font-bold">
            ₹{data.yearlyRevenue}
          </h2>
        </div>
      </div>

      {/* charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* revenue chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-lg mb-5">
            Revenue Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyRevenueChart}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* order chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-lg mb-5">
            Monthly Orders
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyOrdersChart}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* pie charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold mb-5">
            Order Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.orderStatusChart}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
              >
                {data.orderStatusChart.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold mb-5">
            Payment Methods
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.paymentMethodChart}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
              >
                {data.paymentMethodChart.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* stock alerts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-red-600 mb-4">
            Low Stock Products
          </h2>

          {data.lowStockProducts.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-3"
            >
              <span>{item.name}</span>
              <span>{item.stock}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-red-600 mb-4">
            Out of Stock
          </h2>

          {data.outOfStockProducts.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-3"
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* recent orders */}
      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <h2 className="font-bold text-lg mb-5">
          Recent Orders
        </h2>

        {data.recentOrders.map((order) => (
          <div
            key={order._id}
            className="flex justify-between border-b py-4"
          >
            <div>
              <h3 className="font-semibold">
                {order.user?.name}
              </h3>
              <p className="text-sm text-gray-500">
                {order.user?.email}
              </p>
            </div>

            <div>
              ₹{order.totalAmount}
            </div>
          </div>
        ))}
      </div>

      {/* top customers */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="font-bold text-lg mb-5">
          Top Customers
        </h2>

        {data.topCustomers.map((customer, index) => (
          <div
            key={index}
            className="flex justify-between border-b py-4"
          >
            <span>User ID: {customer._id}</span>
            <span>₹{customer.totalSpent}</span>
          </div>
        ))}
      </div>

    </div>
  );
}