

"use client";
import { client } from "@/utils/helper";
import React, { useRef, useState } from "react";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";

export default function categoryAdd() {
   const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const router = useRouter();
  const nameRef = useRef();
  const slugRef = useRef();
  const imageRef = useRef();

  const createSlug = () => {
    let catslug = nameRef.current.value;

    catslug = catslug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    slugRef.current.value = catslug;
  };

 

  const submitHandler = (event) => {
    event.preventDefault();
    
    

    const payload = new FormData();
    payload.append("image", event.target.image.files[0]);
    payload.append("name", nameRef.current.value);
    payload.append("slug", slugRef.current.value);
   

    setLoading(true);
    

    client
      .post("category/create", payload)
      .then((response) => {
        notify(response.data.message, response.data.success);

        if (response.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
          imageRef.current.value = "";
          
        }

        router.push("/admin/category");
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message || "Internal server error";
        notify(message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Add New Category
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">

          {/* Category Name */}
          <div>
            <label className="block text-base font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Ex. Mobile phone"
              onChange={(e) =>createSlug(e.target.value)}
              className="w-full mt-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-base font-medium text-gray-700">
              Slug
            </label>
            <input
              type="text"
              ref={slugRef}
              readOnly
             
              className="w-full mt-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>

          {/* 🔥 Image Upload Box */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>

            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl p-4 flex  items-center flex-col justify-center cursor-pointer hover:border-orange-400 transition" >
             
            <FiImage className="mx-auto text-2xl text-gray-400 mb-2"/>
            <p className="text-sm text-gray-500">
              Click to upload or drag & drop
            </p>

           
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              name="image"
             className="mt-3  text-sm"
            />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 cursor-pointer rounded-xl text-lg font-semibold shadow-md transition"
          >
            {loading ? "Wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}







