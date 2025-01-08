import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded overflow-clip">
      <img
        src={product.image_url || "https://via.placeholder.com/150"}
        alt={product.product_name}
        className="w-full h-32 object-cover mb-2"
      />
      <h2 className="text-lg font-bold">{product.product_name}</h2>
      <p>Category: {product.categories}</p>
      <p>Nutrition Grade: {product.nutrition_grades || "N/A"}</p>
      <Link to={`/product/${product.code}`} className="text-blue-500 underline">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
