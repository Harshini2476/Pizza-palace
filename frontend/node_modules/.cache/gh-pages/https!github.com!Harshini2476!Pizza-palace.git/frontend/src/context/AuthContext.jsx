import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // Login
  const login = (email, password) => {
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

      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));

      return true;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!existingUser) {
      return false;
    }

    const loggedInUser = {
      name: existingUser.name,
      email: existingUser.email,
      role: "user",
    };

    setUser(loggedInUser);
    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    return true;
  };

  // Register
  const register = (name, email, password) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(
      (u) => u.email === email
    );

    if (userExists) {
      return false;
    }

    const newUser = {
      name,
      email,
      password,
      role: "user",
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const loggedInUser = {
      name,
      email,
      role: "user",
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
