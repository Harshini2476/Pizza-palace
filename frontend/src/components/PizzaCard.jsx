import { Link } from "react-router-dom";

function PizzaCard({ pizza, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Pizza Image */}
      <img
        src={pizza.image}
        alt={pizza.name}
        className="w-full h-52 object-cover"
      />

      {/* Content */}
      <div className="p-4">

        {/* Category */}
        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {pizza.category}
        </span>

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800">
          {pizza.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2">
          {pizza.description}
        </p>

        {/* Ingredients */}
        <p className="text-gray-500 text-sm mt-2">
          <strong>Ingredients:</strong>{" "}
          {pizza.ingredients.join(", ")}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">

          <span className="text-2xl font-bold text-red-600">
            ₹{pizza.price}
          </span>

          <button
            onClick={() => addToCart(pizza)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Add To Cart
          </button>
        </div>

        {/* View Details */}
        <Link
          to={`/pizza/${pizza.id}`}
          className="block text-center mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}

export default PizzaCard;
