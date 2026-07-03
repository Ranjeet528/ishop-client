'use client'
import react, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {  getBrands, getColors } from "@/api/api-call";
import { getCategories} from "@/api/api-call";
import Select from 'react-select'
import { client, notify } from "@/utils/helper";
import { Editor } from 'primereact/editor';



export default function AddProduct() {


  const [text,setText]=useState("");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [color, setColor] = useState([]);

  const [selectColors, setselectColors] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const original_price_ref = useRef();
  const discountPercentage_ref = useRef();
  const final_price_ref = useRef();
  const nameRef = useRef();
  const slugRef = useRef();
  const imageRef = useRef();

  function colorSelect(cat) {
    const selectItem = cat.map((cat) => cat.value)
    setselectColors(selectItem)

  }

  const getData = async () => {
    const [catRes, colorRes, brandRes] = await Promise.all([
      getCategories(),
      getColors(),
      getBrands()

    ]);

    setCategory(catRes?.data?.map((cat) => ({ label: cat.name, value: cat._id })) || []);
    setColor(colorRes?.data?.map((color) => ({ label: color.name, value: color._id })) || []);
    setBrand(brandRes?.data?.map((brand) => ({ label: brand.name, value: brand._id })) || []);

  }
  useEffect(
    () => {
      getData()
    },
    []
  )



  const createSlug = () => {
    let catslug = nameRef.current.value;

    catslug = catslug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    slugRef.current.value = catslug;
  };

  function calculatePrice(type) {
    let op = Number(original_price_ref.current.value);
    let fp = Number(final_price_ref.current.value);
    let dp = Number(discountPercentage_ref.current.value);

    if (!op) return;


    if (type === "final") {
      if (!fp) return;

      let discount = ((op - fp) / op) * 100;
      discountPercentage_ref.current.value = discount.toFixed(2);
    }

    if (type === "discount") {
      if (!dp) return;

      let final = op - (op * dp / 100);
      final_price_ref.current.value = final.toFixed(2);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();



    const payload = new FormData();
    payload.append("thumbnail", imageRef.current.files[0]);
    payload.append("name", nameRef.current.value);
    payload.append("slug", slugRef.current.value);
    payload.append("original_price", original_price_ref.current.value);
    payload.append("discountPercentage", discountPercentage_ref.current.value);
    payload.append("final_price", final_price_ref.current.value);
    payload.append("categoryId", event.target.category.value);
    payload.append("brandId", event.target.brand.value);
    payload.append("colorIds", JSON.stringify(selectColors))
    payload.append("short_description", event.target.short_description.value);
    payload.append("long_description", text);



    setLoading(true);


    client
      .post("product/create", payload)
      .then((response) => {
        notify(response.data.message, response.data.success);

        if (response.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
          imageRef.current.value = "";
          original_price_ref.current.value = "";
          discountPercentage_ref.current.value = "";
          final_price_ref.current.value = "";
          event.target.reset()

        }

        router.push("/admin/product");
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-6">Add Product</h2>

        <form onSubmit={submitHandler} className="space-y-6">

          {/* Name + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                onChange={createSlug}
                ref={nameRef}
                placeholder="Enter product name"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Slug</label>
              <input
                type="text"
                ref={slugRef}
                readOnly
                placeholder="Auto generated slug"
                className="w-full border px-4 py-2 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-1 font-medium">Short Description</label>
            <input
              type="text"
              name="short_description"
              placeholder="Enter short description"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block mb-1 font-medium">Long Description</label>

            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
              
          </div>

          {/* Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Original Price</label>

              <input
                type="number"
                ref={original_price_ref}
                placeholder="Enter price"
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Discount %</label>
              <input
                type="number"
                onChange={() => calculatePrice("discount")}

                ref={discountPercentage_ref}
                placeholder="Enter discount"
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Final Price</label>
              <input
                type="number"
                onChange={() => calculatePrice("final")}

                ref={final_price_ref}
                placeholder="Auto calculated"
                className="w-full border px-4 py-2 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Category + Brand + Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <Select
                name="category"
                closeMenuOnSelect={false}
                className=" w-full border rounded-lg" options={
                  category.map((cat) => (
                    { value: cat.value, label: cat.label }

                  ))
                } />
            </div>

            <div>
              <label className="block mb-1 font-medium">Brand</label>
              <Select
                name="brand"
                closeMenuOnSelect={false}
                className=" w-full border rounded-lg" options={
                  brand.map((br) => (
                    { value: br.value, label: br.label }

                  ))
                } />
            </div>

            <div>
              <label className="block mb-1 font-medium">Colors</label>
              <Select
                name="color"
                isMulti
                onChange={colorSelect}
                closeMenuOnSelect={false}
                className=" w-full border rounded-lg" options={
                  color.map((col) => (
                    { value: col.value, label: col.label }

                  ))
                } />
            </div>
          </div>
          {/* Thumbnail Image */}
          <div className="w-full">
            <label className="block mb-1 font-medium">Thumbnail Image</label>

            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              name="thumbnail"
              className="w-full border px-4 py-2 rounded-lg
                text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}