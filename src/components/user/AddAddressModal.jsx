"use client";

import { useState,useEffect } from "react";
import { Trash2, MapPin } from "lucide-react";
import axios from "axios";

export default function AddAddressPage({ user }) {
  


 const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    setAddresses(user?.addresses || []);
  }, [user]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save Address in DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
         "http://localhost:5000/api/user/addAddress",
        formData,
        {
          withCredentials: true,
        }
      );

      setAddresses(res.data.addresses);

      setFormData({
        fullName: "",
        mobile: "",
        pincode: "",
        city: "",
        state: "",
        addressLine: "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Delete only frontend for now
  const handleDelete = (id) => {
    setAddresses((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* Left Side Form */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="text-[#0FA7A6]" />
            Add New Address
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 outline-none focus:border-[#0FA7A6]"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Phone Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 outline-none focus:border-[#0FA7A6]"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 outline-none focus:border-[#0FA7A6]"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 outline-none focus:border-[#0FA7A6]"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 outline-none focus:border-[#0FA7A6]"
              />
            </div>

            <textarea
              name="addressLine"
              placeholder="Full Address"
              value={formData.addressLine}
              onChange={handleChange}
              rows="5"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#0FA7A6] resize-none"
            />

            <button
              type="submit"
              className="w-full bg-[#0FA7A6] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* Right Side Saved Addresses */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>

          {addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-5 hover:border-[#0FA7A6] transition"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.fullName}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {item.addressLine}, {item.city}, {item.state} -{" "}
                        {item.pincode}
                      </p>

                      <p className="text-sm mt-3 font-medium">
                        +91 {item.mobile}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">
              No saved addresses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}