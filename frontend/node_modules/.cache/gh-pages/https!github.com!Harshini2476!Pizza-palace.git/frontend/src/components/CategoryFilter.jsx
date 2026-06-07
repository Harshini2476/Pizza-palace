import React from "react";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { name: "All", emoji: "🍕" },
    { name: "Veg", emoji: "🌿" },
    { name: "Non-Veg", emoji: "🍗" },
    { name: "Specialty", emoji: "⭐" },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category.name
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
          }`}
        >
          <span className="mr-2">{category.emoji}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
