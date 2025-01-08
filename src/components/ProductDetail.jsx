import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${code}.json`
      );
      const data = await response.json();
      setProduct(data.product);
    };

    fetchProduct();
  }, [code]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
      <img
        src={product.image_url}
        alt={product.product_name}
        className="mb-4 w-1/2"
      />
      <p>
        <strong>Ingredients:</strong> {product.ingredients_text || "N/A"}
      </p>
      <p>
        <strong>Nutrition:</strong>
      </p>
      <ul>
        <li>Energy: {product.nutriments.energy || "N/A"} kJ</li>
        <li>Fat: {product.nutriments.fat || "N/A"} g</li>
        <li>Carbs: {product.nutriments.carbohydrates || "N/A"} g</li>
        <li>Proteins: {product.nutriments.proteins || "N/A"} g</li>
      </ul>
      <p>
        <strong>Labels:</strong> {product.labels || "N/A"}
      </p>
    </div>
  );
};

export default ProductDetail;
