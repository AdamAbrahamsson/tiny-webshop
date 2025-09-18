import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const createOrder = async () => {
    const token = localStorage.getItem("token"); // JWT token
    if (!token) {
      alert("You must be logged in to create an order!");
      return;
    }
  
    // Map cart items to the backend format
    const orderItems = cart.map(item => ({
      product_id: item.id, // backend expects product_id
      quantity: item.quantity,
    }));
  
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send the JWT
        },
        body: JSON.stringify({ items: orderItems }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Order created successfully!");
        clearCart();
      } else {
        alert(data.error || "Failed to create order.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Check console.");
    }
  };
  
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    window.dispatchEvent(new Event("cartUpdated")); // Update navbar
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.title} - {item.quantity} × {item.price} = {(item.quantity * item.price).toFixed(2)} SEK
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> {total.toFixed(2)} SEK</p>
      <button onClick={createOrder} style={{ marginRight: "1rem" }}>Create Order</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
