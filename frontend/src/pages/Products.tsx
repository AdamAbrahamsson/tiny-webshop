import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import "./Products.css";

interface Product {
  id: number;
  title: string;
  image_url: string;
  price: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products") // Replace with your backend URL
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "20px" }}>
            <Link to={`/products/${p.id}`}>
              <img
                src={p.image_url}
                alt={p.title}
                style={{ width: "100px", borderRadius: "6px" }}
              />
              <div>{p.title}</div>
              <div>{p.price} SEK</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
