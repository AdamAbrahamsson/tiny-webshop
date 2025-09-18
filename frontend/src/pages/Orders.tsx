import React, { useEffect, useState } from "react";

interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  created_at: string;
  items: OrderItem[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to see your orders!");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok || res.status === 200) {
          setOrders(data);
        } else {
          alert(data.error || "Failed to fetch orders.");
        }
      } catch (err) {
        console.error(err);
        alert("Server error. Check console.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Orders</h1>
      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.title} - {item.quantity} × {item.price} = {(item.quantity * item.price).toFixed(2)} SEK
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> {order.items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} SEK
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
