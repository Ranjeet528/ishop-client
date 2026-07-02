// "use client"
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, qtyChange } from "@/redux/features/cartSlice";

// export default function AddToCart({ product, imageBaseUrl }) {
//   const cart = useSelector((store) => store.cart);
//   const cartItems = cart?.items.find((item) => item.id == product._id);

//   const dispacher = useDispatch()
//   return (
//     <div className="w-full">

//       {
//         cartItems ?
//           <div className="flex gap-4 w-full py-3 rounded-2xl items-center justify-center font-semibold text-sm md:text-base transition-all duration-300  ">
//             <button onClick={()=>dispacher(qtyChange({id:product._id,flag:"inc"}))} className="bg-[#0FA7A6] py-2 px-7 text-2xl text-white rounded-2xl hover:bg-gray-400 hover:shadow-md active:scale-[0.98] ">+</button>
//             <h2 className="text-2xl">{cartItems.qty || 0}</h2>
//             <button onClick={()=>dispacher(qtyChange({id:product._id,flag:"dec"}))} className="bg-[#0FA7A6] py-2 px-7 text-2xl text-white rounded-2xl hover:bg-gray-400 hover:shadow-md active:scale-[0.98]">-</button>
//           </div>
//           :
//           <button
//         onClick={() => {
//           dispacher(addToCart(
//             {
//               name: product.name,
//               original_price: product.original_price,
//               final_price: product.final_price,
//               id: product._id,
//               discountPercentage: product?.discountPercentage || 0,
//               thumbnail: imageBaseUrl,
//               stock: product.stock || 0,
//               qty: 1
//             }
//           ))

//         }}
//         disabled={!product?.stock}
//         className={`w-full py-3 rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 shadow-sm
//         ${product?.stock
//             ? "bg-[#0FA7A6] text-white hover:bg-gray-400 hover:shadow-md active:scale-[0.98]"
//             : "bg-gray-200 text-gray-500 cursor-not-allowed"
//           }`}
//       >
//         {product?.stock ? "Add to Cart" : "Unavailable"}
//       </button>
//      }
     
      
//     </div>
//   );
// }


"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, qtyChange } from "@/redux/features/cartSlice";
import { client } from "@/utils/helper";

export default function AddToCart({ product, imageBaseUrl }) {
  const cart = useSelector((store) => store.cart);

  const cartItems = cart?.items?.find(
    (item) => item.id === product._id
  );

  const dispatch = useDispatch();

  // Add product
  const handleAddToCart = async () => {
    try {
      const response = await client.post("/cart/add", {
        id: product._id,
        qty: 1,
      });

      if (response.data.success) {
        dispatch(
          addToCart({
            name: product.name,
            original_price: product.original_price,
            final_price: product.final_price,
            id: product._id,
            discountPercentage: product?.discountPercentage || 0,
            thumbnail: imageBaseUrl,
            stock: product.stock || 0,
            qty: 1,
          })
        );
      }
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

  // Quantity change
  const handleQtyChange = async (flag) => {
    try {
      dispatch(
        qtyChange({
          id: product._id,
          flag,
        })
      );

      await client.put("/cart/update-qty", {
        id: product._id,
        flag,
      });
    } catch (error) {
      console.log("Qty update error:", error);
    }
  };

  return (
    <div className="w-full">
      {cartItems ? (
        <div className="flex gap-4 w-full py-3 rounded-2xl items-center justify-center font-semibold text-sm md:text-base transition-all duration-300">
          <button
            onClick={() => handleQtyChange("inc")}
            className="bg-[#0FA7A6] py-2 px-7 text-2xl text-white rounded-2xl hover:bg-gray-400 hover:shadow-md active:scale-[0.98]"
          >
            +
          </button>

          <h2 className="text-2xl">{cartItems.qty || 0}</h2>

          <button
            onClick={() => handleQtyChange("dec")}
            className="bg-[#0FA7A6] py-2 px-7 text-2xl text-white rounded-2xl hover:bg-gray-400 hover:shadow-md active:scale-[0.98]"
          >
            -
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={!product?.stock}
          className={`w-full py-3 rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 shadow-sm
          ${
            product?.stock
              ? "bg-[#0FA7A6] text-white hover:bg-gray-400 hover:shadow-md active:scale-[0.98]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product?.stock ? "Add to Cart" : "Unavailable"}
        </button>
      )}
    </div>
  );
}