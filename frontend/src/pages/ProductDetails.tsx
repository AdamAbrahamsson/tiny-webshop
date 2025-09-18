import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = savedCart.find((i: any) => i.id === product.id);

    if (existing) {
      existing.quantity = Math.min(3, existing.quantity + qty); // max 3
    } else {
      savedCart.push({
        id: product.id,
        title: product.title,
        quantity: qty,
        price: product.price,
      });
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));

    // Notify navbar to update cart count
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${qty} ${product.title} added to cart`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.title}</h1>
      <img
        src={product.image_url}
        alt={product.title}
        style={{ width: "400px", height: "200px", objectFit: "cover" }}
      />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.quantity}</p>

      <label>
        Quantity:
        <select value={qty} onChange={e => setQty(Number(e.target.value))}>
          {[1, 2, 3].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <br /><br />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
