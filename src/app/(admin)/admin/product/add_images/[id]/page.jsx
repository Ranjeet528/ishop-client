"use client";
import { useEffect } from 'react'
import { client } from "@/utils/helper";
import React, { useState } from "react";
import { notify } from "@/utils/helper";
import { useParams, useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";
import { findProductById } from '@/api/server-api';

export default function page() {

    const [baseUrl, setbaseUrl] = useState("")
    const { id } = useParams();

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchloading] = useState(false)
    const [product, setProduct] = useState({});







    const submitHandler = (event) => {
        event.preventDefault();



        const payload = new FormData();

        for (let image of event.target.image.files) {
            payload.append("images", image);
        }



        setLoading(true);


        client
            .post(`product/add_images/${id}`, payload)
            .then((response) => {
                notify(response.data.message, response.data.success);

                if (response.data.success) {
                    router.push("/admin/product");


                }

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
     const remove_image = (name) => {
       
          client
            .put(`product/remove_image/${id}`, {image_name:name})
            .then((response) => {
                router.refresh();
                notify(response.data.message, response.data.success);

            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message || "Internal server error";
                notify(message, false);
            })
           
    };

    async function getProducts() {
        try {
            setFetchloading(true)
            const { data, meta } = await findProductById(id)

            console.log(meta.imageBaseUrl, "imgurl")

            setProduct(data)
            setbaseUrl(meta?.imageBaseUrl)




        } catch (error) {
            console.log(error)

        } finally {
            setFetchloading(false)
        }
    }

    useEffect(
        () => {

            getProducts();

        },
        [id]
    )




    if (fetchLoading) {
        return (
            <h2 className='h-screen flex justify-center items-center'>Loading....</h2>
        )
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">
                    Add Images
                </h2>

                <form onSubmit={submitHandler} className="space-y-6">


                    {/* 🔥 Image Upload Box */}
                    <div>
                        <label className=" text-sm font-medium text-gray-700 mb-2">
                            Image
                        </label>

                        <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl p-4 flex  items-center flex-col justify-center cursor-pointer hover:border-orange-400 transition" >

                            <FiImage className="mx-auto text-2xl text-gray-400 mb-2" />

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                name="image"
                                className="mt-3  text-sm"
                            />
                        </div>
                        <div className="flex gap-6 flex-wrap mt-4">
                            {product?.images?.map((image, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="relative group w-32 h-32"
                                    >
                                        <img
                                            src={`${baseUrl}/${image}`}
                                            alt="product"
                                            className="w-32 h-32 object-cover rounded-2xl border"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                            <button
                                                type="button"
                                                className="bg-red-400 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                                                onClick={() => remove_image(image)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 cursor-pointer rounded-xl text-lg font-semibold shadow-md transition"
                    >
                        {loading ? "Updating..." : "Add Images"}
                    </button>
                </form>
            </div>
        </div>
    );
}







