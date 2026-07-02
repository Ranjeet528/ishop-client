"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Plus, CreditCard, Truck } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { client } from "@/utils/helper";
import { useRazorpay} from "react-razorpay";


export default function Checkout({ user }) {
  const { error, isLoading, Razorpay } = useRazorpay();


  const cart = useSelector((store) => store.cart)
  // console.log(cart,"cart dataa")

  const addresses = user?.addresses || []
  const router = useRouter();


  // console.log(addresses,"addressesss")

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false)

  const handleAddressess = () => {
    router.push('/profile')
  };


  const handleOrder = async () => {
    setLoading(true);

    try {
      const selectedAddressObj = addresses.find(
        (addr) => addr._id === selectedAddress
      );

      const orderData = {
        address: selectedAddressObj,
        paymentMethod,
        shipping,
        total,
      };

      const response = await client.post("/order/place", orderData);

      if (paymentMethod === "cod") {
        if (response.data.success) {
          router.push(`/thanku?orderId=${response.data.orderId}`);
        }

      } else {

        console.log(response.data)
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

          currency: "INR",
          name: "Ishop Company",
          description: "Test Transaction",
          order_id: response.data.payment_order_id, // Generate order_id on server
          handler: async (response) => {
           try {
            const verifyResponse = await client.post("order/verify", response);
            console.log(verifyResponse)

            
           } catch (error) {
            
           }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: "7414875774",
          },
          theme: {
            color: "#F37254",
          },
        }
         const razorpayInstance = new Razorpay(options);
  razorpayInstance.open();

      }

    } catch (error) {
      console.log("ORDER ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }


  const cartItems = cart?.items || [];

  const subtotal = cart.original_total;
  const total = cart.final_total;

  const shipping = subtotal > 0 ? 99 : 0;
  const discount = subtotal - total;



  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">

          {/* Address Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="text-[#0FA7A6]" />
                Delivery Address
              </h2>

              <Link
                href="/profile"
                className="flex items-center gap-2 bg-[#0FA7A6] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                <Plus size={18} />
                Add New Address
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {addresses.length > 0 ? (
                addresses.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedAddress(item._id)}
                    className={`border rounded-xl p-4 cursor-pointer transition ${selectedAddress === item._id
                      ? "border-[#0FA7A6] bg-[#0FA7A6]/10"
                      : "border-gray-200"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={selectedAddress === item._id}
                        readOnly
                        className="mt-1 accent-[#0FA7A6]"
                      />

                      <div>
                        <h3 className="font-semibold">{item.fullName}</h3>

                        <p className="text-gray-600 text-sm mt-1">
                          {item.addressLine}, {item.city}, {item.state} - {item.pincode}
                        </p>

                        <p className="text-sm mt-2">+91 {item.mobile}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  No address found. Add one first.
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <CreditCard className="text-[#0FA7A6]" />
              Payment Method
            </h2>

            <div className="space-y-4">
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`border rounded-xl p-4 cursor-pointer flex items-center gap-3 ${paymentMethod === "cod"
                  ? "border-[#0FA7A6] bg-[#0FA7A6]/10"
                  : "border-gray-200"
                  }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  readOnly
                  className="accent-[#0FA7A6]"
                />
                <Truck />
                <span>Cash on Delivery</span>
              </div>

              <div
                onClick={() => setPaymentMethod("online")}
                className={`border rounded-xl p-4 cursor-pointer flex items-center gap-3 ${paymentMethod === "online"
                  ? "border-[#0FA7A6] bg-[#0FA7A6]/10"
                  : "border-gray-200"
                  }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  readOnly
                  className="accent-[#0FA7A6]"
                />
                <CreditCard />
                <span>Online Payment (UPI / Card / Net Banking)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 border-b pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.qty}</p>
                </div>
                <p>₹{item.final_price}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:border-[#0FA7A6]"
            />
            <button className="bg-[#0FA7A6] text-white px-4 rounded-lg">
              Apply
            </button>
          </div>

          <div className="space-y-3 mt-6 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          </div>

          <div className="border-t mt-6 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button onClick={handleOrder} className="w-full mt-6 bg-[#0FA7A6] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
