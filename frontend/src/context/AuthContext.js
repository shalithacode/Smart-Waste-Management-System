import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    // Fetch stored user and token from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // Only update auth state if both user and token are found
    if (storedUser && storedToken) {
      try {
        setAuth({
          user: JSON.parse(storedUser), // Safely parse the user
          token: storedToken, // Token doesn't need parsing
        });
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []); // This useEffect runs once when the component mounts

  const login = (user, token) => {
    if (user && token) {
      // Ensure user and token are valid
      setAuth({ user, token });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      console.error("Invalid user or token during login");
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
