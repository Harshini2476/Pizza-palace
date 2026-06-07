const AUTH_STORAGE_KEY = "pizza-palace-auth";

const authService = {
  login(email, password) {
    // Admin Login
    if (
      email === "admin@pizzapalace.com" &&
      password === "admin123"
    ) {
      const adminUser = {
        name: "Admin",
        email: "admin@pizzapalace.com",
        role: "admin",
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(adminUser)
      );

      return adminUser;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!existingUser) {
      return null;
    }

    const loggedInUser = {
      name: existingUser.name,
      email: existingUser.email,
      role: "user",
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(loggedInUser)
    );

    return loggedInUser;
  },

  register(name, email, password) {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.find(
      (user) => user.email === email
    );

    if (alreadyExists) {
      return null;
    }

    const newUser = {
      name,
      email,
      password,
      role: "user",
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    const loggedInUser = {
      name,
      email,
      role: "user",
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(loggedInUser)
    );

    return loggedInUser;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getStoredUser() {
    try {
      const user = localStorage.getItem(
        AUTH_STORAGE_KEY
      );

      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
};

export default authService;