import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  userName: string | null;
  setUserName: (name: string | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, setUserName }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // Update cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((acc: any, item: any) => acc + item.quantity, 0);
    setCartCount(total);
  };

  // Call on mount
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((acc: any, item: any) => acc + item.quantity, 0);
      setCartCount(total);
    };
  
    updateCartCount();
  
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("cart"); 
    setUserName(null);
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#007bff", color: "white" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "white" }}>Home</Link>
      <Link to="/products" style={{ marginRight: "1rem", color: "white" }}>Products</Link>
      <Link to="/cart" style={{ marginRight: "1rem", color: "white" }}>Cart ({cartCount})</Link>

      {userName ? (
        <>
          <span style={{ marginRight: "1rem" }}>Welcome, {userName}!</span>
          <Link to="/orders" style={{ marginRight: "1rem", color: "white" }}>My Orders</Link>
          <button
            onClick={handleLogout}
            style={{ color: "#007bff", background: "white", border: "none", padding: "0.2rem 0.5rem", cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={{ color: "white" }}>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
