import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("pizza-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("pizza-cart", JSON.stringify(items));
  }, [items]);

  // Add Pizza
  const addItem = (pizza) => {
    const existingItem = items.find(
      (item) => item.pizza.id === pizza.id
    );

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          pizza,
          quantity: 1,
          size: "Medium",
        },
      ]);
    }
  };

  // Remove Pizza
  const removeItem = (pizzaId, size = "Medium") => {
    setItems(
      items.filter(
        (item) =>
          !(
            item.pizza.id === pizzaId &&
            item.size === size
          )
      )
    );
  };

  // Update Quantity
  const updateQuantity = (
    pizzaId,
    size = "Medium",
    quantity
  ) => {
    if (quantity <= 0) {
      removeItem(pizzaId, size);
      return;
    }

    setItems(
      items.map((item) =>
        item.pizza.id === pizzaId &&
        item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setItems([]);
  };

  // Total Items
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Price
  const totalPrice = items.reduce(
    (total, item) =>
      total + item.pizza.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
