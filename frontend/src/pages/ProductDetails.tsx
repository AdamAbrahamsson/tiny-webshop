import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.title}</h1>
      <img src={product.image_url} alt={product.title} style={{ width: "400px", height: "200px", objectFit: "cover" }} />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.quantity}</p>
    </div>
  );
};

export default ProductDetail;
