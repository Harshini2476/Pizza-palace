const ORDERS_STORAGE_KEY = "orders";

const getOrdersFromStorage = () => {
  return JSON.parse(
    localStorage.getItem(ORDERS_STORAGE_KEY) || "[]"
  );
};

const saveOrdersToStorage = (orders) => {
  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders)
  );
};

const getCurrentUser = () => {
  return JSON.parse(
    localStorage.getItem("user") || "null"
  );
};

const calculateSubtotal = (item) => {
  const multipliers = {
    Small: 1,
    Medium: 1.2,
    Large: 1.5,
  };

  return (
    item.pizza.price *
    multipliers[item.size] *
    item.quantity
  );
};

const orderService = {
  getOrders() {
    const user = getCurrentUser();

    if (!user) return [];

    const orders = getOrdersFromStorage();

    if (user.role === "admin") {
      return orders;
    }

    return orders.filter(
      (order) => order.userEmail === user.email
    );
  },

  getOrderById(id) {
    const orders = getOrdersFromStorage();

    return (
      orders.find((order) => order.id === id) || null
    );
  },

  placeOrder(items, deliveryAddress) {
    const user = getCurrentUser();

    if (!user) {
      throw new Error("Please login first");
    }

    const orders = getOrdersFromStorage();

    const orderItems = items.map((item) => ({
      pizza: item.pizza,
      quantity: item.quantity,
      size: item.size,
      subtotal: calculateSubtotal(item),
    }));

    const total = orderItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    const newOrder = {
      id: Date.now().toString(),
      userEmail: user.email,
      items: orderItems,
      total,
      status: "Pending",
      deliveryAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);

    saveOrdersToStorage(orders);

    return newOrder;
  },

  updateStatus(orderId, status) {
    const orders = getOrdersFromStorage();

    const index = orders.findIndex(
      (order) => order.id === orderId
    );

    if (index === -1) {
      return null;
    }

    orders[index].status = status;
    orders[index].updatedAt =
      new Date().toISOString();

    saveOrdersToStorage(orders);

    return orders[index];
  },

  getAllOrders() {
    return getOrdersFromStorage();
  },
};

export default orderService;
