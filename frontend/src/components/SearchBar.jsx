import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="relative">

        {/* Search Icon */}
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </span>

        {/* Input */}
        <input
          type="text"
          placeholder="Search pizzas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
          >
            ✖
          </button>
        )}

      </div>
    </div>
  );
}

export default SearchBar;
