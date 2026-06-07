import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import orderService from "../services/orderService";

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setCheckoutError("");

    try {
      await orderService.placeOrder(items, data);

      clearCart();
      setPlaced(true);

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      setCheckoutError(
        error?.message || "Failed to place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>

          <h2 className="text-3xl font-bold mb-2">
            Order Placed Successfully!
          </h2>

          <p className="text-gray-600">
            Redirecting to your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-5 gap-8">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">
                Delivery Address
              </h2>

              <div className="space-y-4">

                <div>
                  <label className="block mb-1 font-medium">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="John Doe"
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                  />

                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="9876543210"
                    {...register("phone", {
                      required: "Phone Number is required",
                    })}
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Street Address
                  </label>

                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="123 Main Street"
                    {...register("street", {
                      required: "Street Address is required",
                    })}
                  />

                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.street.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <label className="block mb-1 font-medium">
                      City
                    </label>

                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Chennai"
                      {...register("city", {
                        required: "City is required",
                      })}
                    />

                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      ZIP Code
                    </label>

                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="600001"
                      {...register("zipCode", {
                        required: "ZIP Code is required",
                      })}
                    />

                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zipCode.message}
                      </p>
                    )}
                  </div>

                </div>

              </div>
            </div>

            {checkoutError && (
              <div className="bg-red-100 text-red-600 border border-red-300 p-4 rounded-lg">
                {checkoutError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {isSubmitting
                ? "Placing Order..."
                : `Place Order - ₹${totalPrice.toFixed(2)}`}
            </button>

          </form>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-red-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Free delivery on orders above ₹500
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;
