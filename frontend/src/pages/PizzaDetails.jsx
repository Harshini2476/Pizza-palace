import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  ShoppingCart,
  Star,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import pizzaService from "../services/pizzaService";

const SIZE_PRICE_MULTIPLIER = {
  Small: 0.8,
  Medium: 1,
  Large: 1.2,
};

const SIZES = ["Small", "Medium", "Large"];

const SIZE_LABELS = {
  Small: '10"',
  Medium: '12"',
  Large: '14"',
};

const CATEGORY_COLORS = {
  Veg: "bg-green-100 text-green-700 border-green-300",
  "Non-Veg": "bg-red-100 text-red-700 border-red-300",
  Specialty: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

function PizzaDetail() {
  const { id } = useParams();

  const { addItem } = useCart();

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedSize, setSelectedSize] =
    useState("Medium");

  const [activeImage, setActiveImage] =
    useState(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    pizzaService
      .getById(id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setPizza(data);
          setActiveImage(
            data.imageHD || data.image
          );
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading Pizza...
        </p>
      </div>
    );
  }

  if (notFound || !pizza) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍕</div>

          <h2 className="text-3xl font-bold mb-3">
            Pizza Not Found
          </h2>

          <Link
            to="/menu"
            className="bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            Back To Menu
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice =
    pizza.price *
    SIZE_PRICE_MULTIPLIER[selectedSize];

  const mainImage =
    activeImage ||
    pizza.imageHD ||
    pizza.image;

  const gallery =
    pizza.imageGallery || [];

  const handleAddToCart = () => {
    addItem({
      ...pizza,
      size: selectedSize,
      price: finalPrice,
    });

    alert(
      `${pizza.name} (${selectedSize}) added to cart`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <Link
          to="/menu"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-red-600"
        >
          <ArrowLeft size={18} />
          Back To Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Images */}
          <div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={mainImage}
                alt={pizza.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {gallery.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setActiveImage(image)
                    }
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      image === mainImage
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Pizza ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Details */}
          <div>

            <span
              className={`inline-block px-3 py-1 rounded-full border text-sm mb-4 ${
                CATEGORY_COLORS[pizza.category]
              }`}
            >
              {pizza.category}
            </span>

            <h1 className="text-4xl font-bold mb-3">
              {pizza.name}
            </h1>

            {pizza.rating && (
              <div className="flex items-center gap-2 mb-4">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span>{pizza.rating}</span>
              </div>
            )}

            <p className="text-gray-600 mb-6">
              {pizza.description}
            </p>

            {/* Ingredients */}
            <div className="mb-6">

              <h3 className="flex items-center gap-2 font-bold mb-3">
                <ChefHat size={18} />
                Ingredients
              </h3>

              <div className="flex flex-wrap gap-2">
                {pizza.ingredients.map(
                  (ingredient, index) => (
                    <span
                      key={index}
                      className="bg-white border px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  )
                )}
              </div>

            </div>

            {/* Sizes */}
            <div className="mb-6">

              <h3 className="font-bold mb-3">
                Choose Size
              </h3>

              <div className="flex gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    className={`px-5 py-3 rounded-xl border-2 ${
                      selectedSize === size
                        ? "border-red-600 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <div className="text-xl">
                      {SIZE_LABELS[size]}
                    </div>

                    <div>{size}</div>

                    <div className="text-sm text-gray-500">
                      ₹
                      {(
                        pizza.price *
                        SIZE_PRICE_MULTIPLIER[size]
                      ).toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>

            </div>

            {/* Price */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-5 flex justify-between items-center">

              <span className="text-gray-600">
                Total Price
              </span>

              <span className="text-3xl font-bold text-red-600">
                ₹{finalPrice.toFixed(2)}
              </span>

            </div>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!pizza.available}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold disabled:bg-gray-400"
            >
              <ShoppingCart size={22} />

              {pizza.available
                ? `Add To Cart - ₹${finalPrice.toFixed(
                    2
                  )}`
                : "Currently Unavailable"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaDetail;
