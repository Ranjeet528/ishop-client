"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { client, notify } from "@/utils/helper";
import { getCategories } from "@/api/api-call";
import Select from 'react-select'

export default function AddBrand() {
  
  const [category, setCategory]= useState([])
  const [selectCategory, setselectCategory]=useState([])
  
  const nameRef = useRef();
  const slugRef = useRef();
  const router = useRouter();
  const [loading, setLoading]=useState(false);
  const [preview, setPreview] =
  useState(null);

  function categorySelect(cat){
   const selectItem = cat.map((item)=>item.value)
   setselectCategory(selectItem)

  }

  const createSlug = () => {
  let catslug = nameRef.current.value;

  catslug = catslug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  slugRef.current.value = catslug;
  };

  const submitHandler = (event)=>{
    event.preventDefault();

    const payload = new FormData();
    payload.append("image",event.target.image.files[0]);
    payload.append("name", nameRef.current.value);
    payload.append("slug", slugRef.current.value);
    payload.append("categoryId",JSON.stringify(selectCategory));
    payload.append("status", event.target.status.checked);
    payload.append("Is_home", event.target.Is_home.checked);
    payload.append("Is_top", event.target.Is_top.checked);
    payload.append("Is_popular", event.target.Is_popular.checked); 


    setLoading(true);

    client
    .post("brand/create", payload)
    .then((response)=>{
      notify(response.data.message, response.data.success);

      if(response.data.success){
        nameRef.current.value = "";
        slugRef.current.value = "";

        router.push("/admin/brand");

      }
    })
   .catch((err)=>{
    console.log(err);
    const message = err?.response.message || "Internal server error";
    notify(message, false);

   })
   .finally(()=>{
    setLoading(false)
    });
  };


const fetchCategory = async()=>{
  try {
    const res = await getCategories();
    setCategory(res.data);
    
  } catch (error) {
    console.log(error)
    setCategory([]);
    
  }
}
useEffect(()=>{
  fetchCategory()
},[])


 return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Add Brand
          </h2>

          <p className="text-gray-500 text-sm">
            Create a new product brand
          </p>
        </div>

        <Link href="/admin/brand">
          <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition">
            Back
          </button>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">

        <form onSubmit={submitHandler} className="space-y-6">

          {/* Brand Name + Slug */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>

              <input
                type="text"
                ref={nameRef}
                onChange={createSlug}
                  placeholder="Enter brand name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>

              <input
                type="text"
                ref={slugRef}
                readOnly
                placeholder="brand-slug"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>

           
              <Select
              isMulti 
              instanceId="category-select"
              onChange={categorySelect}
              closeMenuOnSelect={false} 
               className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400" options={
                category.map((cat)=>(
                  { value: cat._id, label: cat.name }

                ))
              } />
           
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Logo
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-orange-400 transition">

              {preview ? (
                <img
                  src={preview}
                  name="image"
                  
                  alt="preview"
                  className="w-28 h-28 object-cover rounded-xl mx-auto"
                />
              ) : (
                <div>
                  <p className="text-gray-500 mb-3">
                    Upload brand logo
                  </p>
                </div>
              )}

              <input
                type="file"
                name="image"
                className="mt-4"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Brand Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Status</span>
                <input type="checkbox" name="status" className="w-5 h-5" />
              </label>

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Show on Home</span>
                <input type="checkbox" name="Is_home" className="w-5 h-5" />
              </label>

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Top Brand</span>
                <input type="checkbox" name="Is_top" className="w-5 h-5" />
              </label>

              <label className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer">
                <span>Popular Brand</span>
                <input type="checkbox" name="Is_popular" className="w-5 h-5" />
              </label>

            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Save Brand
            </button>

            <Link href="/admin/brand">
              <button
                type="button"
                className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </Link>

          </div>

        </form>
      </div>
    </div>
  );
}
