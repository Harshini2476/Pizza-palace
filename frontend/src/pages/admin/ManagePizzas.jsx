import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

import { pizzaService } from "../../services/pizzaService";

function ManagePizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    category: "Veg",
    price: "",
    image: "",
    ingredients: "",
  });

  const [addLoading, setAddLoading] = useState(false);

  const getToken = () => {
    const stored = localStorage.getItem("pizza-palace-auth");

    if (!stored) {
      throw new Error("Not authenticated");
    }

    return JSON.parse(stored).token;
  };

  useEffect(() => {
    loadPizzas();
  }, []);

  const loadPizzas = async () => {
    try {
      setLoading(true);
      const data = await pizzaService.getAll();
      setPizzas(data);
    } catch (err) {
      setError("Failed to load pizzas");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const token = getToken();

      const updatedPizza = await pizzaService.toggleAvailability(
        token,
        id
      );

      if (updatedPizza) {
        setPizzas((prev) =>
          prev.map((pizza) =>
            pizza.id === id ? updatedPizza : pizza
          )
        );
      }
    } catch (err) {
      alert("Failed to update pizza");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();

      const success = await pizzaService.deletePizza(token, id);

      if (success) {
        setPizzas((prev) =>
          prev.filter((pizza) => pizza.id !== id)
        );
      }
    } catch (err) {
      alert("Failed to delete pizza");
    }

    setConfirmDelete(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      setAddLoading(true);

      const token = getToken();

      const newPizza = await pizzaService.addPizza(token, {
        name: addForm.name,
        description: addForm.description,
        category: addForm.category,
        price: Number(addForm.price),
        image:
          addForm.image ||
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        ingredients: addForm.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        available: true,
      });

      setPizzas((prev) => [...prev, newPizza]);

      setAddForm({
        name: "",
        description: "",
        category: "Veg",
        price: "",
        image: "",
        ingredients: "",
      });

      setShowAddForm(false);
    } catch (err) {
      alert("Failed to add pizza");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Link to="/admin">
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <h1 className="text-3xl font-bold">
                🍕 Manage Pizzas
              </h1>

              <p className="text-gray-500">
                {pizzas.length} pizzas available
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />

            {showAddForm ? "Cancel" : "Add Pizza"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Add Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddSubmit}
            className="bg-white p-6 rounded-xl shadow mb-8"
          >
            <h2 className="text-xl font-bold mb-4">
              Add New Pizza
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Pizza Name"
                value={addForm.name}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    name: e.target.value,
                  })
                }
                className="border p-2 rounded"
                required
              />

              <select
                value={addForm.category}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    category: e.target.value,
                  })
                }
                className="border p-2 rounded"
              >
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Specialty</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                value={addForm.price}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    price: e.target.value,
                  })
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Image URL"
                value={addForm.image}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    image: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={addForm.description}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    description: e.target.value,
                  })
                }
                className="border p-2 rounded md:col-span-2"
              />

              <input
                type="text"
                placeholder="Ingredients (comma separated)"
                value={addForm.ingredients}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    ingredients: e.target.value,
                  })
                }
                className="border p-2 rounded md:col-span-2"
              />
            </div>

            <button
              type="submit"
              disabled={addLoading}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              {addLoading ? "Adding..." : "Add Pizza"}
            </button>
          </form>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center">Loading pizzas...</p>
        )}

        {error && (
          <p className="text-center text-red-600">{error}</p>
        )}

        {/* Pizza List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">
                    {pizza.name}
                  </h3>

                  <span className="font-bold text-red-600">
                    ₹{pizza.price}
                  </span>
                </div>

                <p className="text-gray-600 mt-2">
                  {pizza.description}
                </p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => handleToggle(pizza.id)}
                    className="border px-3 py-2 rounded flex items-center gap-2"
                  >
                    {pizza.available ? (
                      <ToggleRight />
                    ) : (
                      <ToggleLeft />
                    )}

                    {pizza.available
                      ? "Disable"
                      : "Enable"}
                  </button>

                  <button className="border px-3 py-2 rounded">
                    <Edit size={18} />
                  </button>

                  {confirmDelete === pizza.id ? (
                    <>
                      <button
                        onClick={() =>
                          handleDelete(pizza.id)
                        }
                        className="bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          setConfirmDelete(null)
                        }
                        className="border px-3 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        setConfirmDelete(pizza.id)
                      }
                      className="border px-3 py-2 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default ManagePizzas;
