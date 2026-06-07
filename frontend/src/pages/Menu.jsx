import { useEffect, useMemo, useState } from "react";
import PizzaCard from "../components/PizzaCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import pizzaService from "../services/pizzaService";

function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    pizzaService
      .getAll()
      .then((data) => setPizzas(data))
      .catch(() => setPizzas([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let results = pizzas;

    if (category !== "All") {
      results = results.filter(
        (pizza) => pizza.category === category
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      results = results.filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(query) ||
          pizza.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          )
      );
    }

    return results;
  }, [pizzas, search, category]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-3">
            Our Menu
          </h1>

          <p className="text-lg">
            Handcrafted with premium ingredients
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <CategoryFilter
            value={category}
            onChange={setCategory}
          />
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing{" "}
          <span className="font-semibold">
            {filtered.length}
          </span>{" "}
          pizza{filtered.length !== 1 ? "s" : ""}
          {search && (
            <>
              {" "}
              for <strong>"{search}"</strong>
            </>
          )}
        </p>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-72 bg-white rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (

          /* Pizza Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pizza, index) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
                index={index}
              />
            ))}
          </div>

        ) : (

          /* No Results */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">
              🔍
            </div>

            <h3 className="text-2xl font-bold mb-2">
              No pizzas found
            </h3>

            <p className="text-gray-600 mb-4">
              Try a different search or category
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="text-red-600 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>

        )}
      </div>
    </div>
  );
}

export default Menu;
