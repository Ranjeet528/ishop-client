"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import slugify from "slugify";
import { client, notify } from "@/utils/helper";

export default function AddColor() {
    const [loading, setLoading]=useState(false)
  
  const router = useRouter();
  const nameref =useRef();
  const slugRef = useRef();
 

  const [form, setForm] = useState({
    name: "",
    slug: "",
    hex: "#000000",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: slugify(value, {
          lower: true,
          strict: true,
        }),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {

        name: nameref.current.value,
        slug: slugRef.current.value,
        color_code: form.hex,
        status: e.target.status.checked
      
    };  
    
    setLoading(true)

    client
    .post("color/create",payload)
    .then((response)=>{
        notify(
            response.data.message,
            response.data.success
        );
        if(response.data.success){
            nameref.current.value= "";
            slugRef.current.value= "";
           

            router.push("/admin/color")

            
        }
    })
    .catch((err)=>{
        console.log(err);

        const message = err?.response?.data?.message || "Internal server error"
        notify(message,false)
    })
    .finally(()=>{
        setLoading(false)

    })

   
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Add Color
        </h2>

        <p className="text-gray-500 text-sm">
          Create new product color
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm border max-w-2xl"
      >

        {/* Color Name */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Color Name
          </label>

          <input
            type="text"
            name="name"
            ref={nameref}
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Red, Blue"
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Slug */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            ref={slugRef}
            value={form.slug}
            readOnly
            className="w-full border bg-gray-100 p-3 rounded-lg text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* HEX Code */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Color Code
          </label>

          <div className="flex gap-3 items-center">

            <input
              type="color"
              name="hex"
              value={form.hex}
              onChange={handleChange}
              className="w-14 h-14 border rounded-lg cursor-pointer"
            />

            <input
              type="text"
              name="hex"
              value={form.hex}
              onChange={handleChange}
              placeholder="#ff0000"
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Preview
          </label>

          <div
            className="w-20 h-20 rounded-xl border shadow-sm"
            style={{ backgroundColor: form.hex }}
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-lg font-medium"
          >
            Save Color
          </button>

          <Link href="/admin/color">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 transition px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          </Link>

        </div>
      </form>
    </div>
  );
}