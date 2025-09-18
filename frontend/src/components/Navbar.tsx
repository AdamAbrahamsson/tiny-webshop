import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "1rem", backgroundColor: "#007bff", color: "white" }}>
    <Link to="/" style={{ marginRight: "1rem", color: "white" }}>Home</Link>
    <Link to="/products" style={{ marginRight: "1rem", color: "white" }}>Products</Link>
    <Link to="/login" style={{ color: "white" }}>Login</Link>
  </nav>
);

export default Navbar;
