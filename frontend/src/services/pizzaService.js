import margherita from "../assets/pizzas/margherita.jpg";
import pepperoni from "../assets/pizzas/pepperoni.jpg";
import veggie from "../assets/pizzas/veggie.jpg";

const PIZZAS_STORAGE_KEY = "pizzas";

const defaultPizzas = [
  {
    id: "1",
    name: "Margherita",
    description: "Classic Italian pizza with mozzarella and basil.",
    category: "Veg",
    ingredients: ["Mozzarella", "Tomato Sauce", "Basil"],
    image: margherita,
    price: 299,
    available: true,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Pepperoni",
    description: "Loaded with pepperoni and mozzarella cheese.",
    category: "Non-Veg",
    ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce"],
    image: pepperoni,
    price: 399,
    available: true,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Veggie Supreme",
    description: "Fresh vegetables and premium cheese.",
    category: "Veg",
    ingredients: [
      "Capsicum",
      "Onion",
      "Olives",
      "Mozzarella",
    ],
    image: veggie,
    price: 349,
    available: true,
    rating: 4.7,
  },
];

function getPizzas() {
  const stored = localStorage.getItem(PIZZAS_STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem(
    PIZZAS_STORAGE_KEY,
    JSON.stringify(defaultPizzas)
  );

  return defaultPizzas;
}

function savePizzas(pizzas) {
  localStorage.setItem(
    PIZZAS_STORAGE_KEY,
    JSON.stringify(pizzas)
  );
}

const pizzaService = {
  getAll(category = "All", search = "") {
    let pizzas = getPizzas();

    search = String(search || "");

    if (category !== "All") {
      pizzas = pizzas.filter(
        (pizza) => pizza.category === category
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      pizzas = pizzas.filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(query) ||
          pizza.description.toLowerCase().includes(query) ||
          pizza.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          )
      );
    }

    return Promise.resolve(pizzas);
  },

  getById(id) {
    const pizzas = getPizzas();

    const pizza =
      pizzas.find((pizza) => pizza.id === id) || null;

    return Promise.resolve(pizza);
  },

  toggleAvailability(id) {
    const pizzas = getPizzas();

    const updated = pizzas.map((pizza) =>
      pizza.id === id
        ? {
            ...pizza,
            available: !pizza.available,
          }
        : pizza
    );

    savePizzas(updated);

    return Promise.resolve(
      updated.find((pizza) => pizza.id === id)
    );
  },

  addPizza(pizza) {
    const pizzas = getPizzas();

    const newPizza = {
      ...pizza,
      id: Date.now().toString(),
      available: true,
      rating: pizza.rating || 4.5,
    };

    pizzas.push(newPizza);

    savePizzas(pizzas);

    return Promise.resolve(newPizza);
  },

  updatePizza(id, updates) {
    const pizzas = getPizzas();

    const updated = pizzas.map((pizza) =>
      pizza.id === id
        ? { ...pizza, ...updates }
        : pizza
    );

    savePizzas(updated);

    return Promise.resolve(
      updated.find((pizza) => pizza.id === id)
    );
  },

  deletePizza(id) {
    const pizzas = getPizzas();

    const updated = pizzas.filter(
      (pizza) => pizza.id !== id
    );

    savePizzas(updated);

    return Promise.resolve(true);
  },
};

export default pizzaService;
export { pizzaService };
