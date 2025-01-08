import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Shimmer from "./Shimmer";
import SortComponent from "./SortComponent";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("snacks");
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [searchMode, setSearchMode] = useState("name");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async () => {
    let url;
    if (searchMode === "name") {
      url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&json=true`;
    } else if (searchMode === "barcode") {
      url = `https://world.openfoodfacts.org/api/v0/product/${search}.json`;
    }
    const response = await fetch(url);
    const data = await response.json();

    if (searchMode === "name") {
      setProducts(data.products || []);
    } else if (searchMode === "barcode") {
      setProducts([data.product]);
    }
  };

  const handleLoadMore = () => {
    setPageNo((prev) => prev + 1);
  };

  const handleSort = (option) => {
    setIsLoading(true);
    setSortOption(option);

    const sortedProducts = [...products];

    if (option === "name-asc") {
      sortedProducts.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    } else if (option === "name-desc") {
      sortedProducts.sort((a, b) =>
        b.product_name.localeCompare(a.product_name)
      );
    } else if (option === "nutrition-asc") {
      sortedProducts.sort((a, b) =>
        (a.nutrition_grades || "").localeCompare(b.nutrition_grades || "")
      );
    } else if (option === "nutrition-desc") {
      sortedProducts.sort((a, b) =>
        (b.nutrition_grades || "").localeCompare(a.nutrition_grades || "")
      );
    }
    setProducts(sortedProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      const response = await fetch(
        "https://world.openfoodfacts.org/categories.json"
      );
      const data = await response.json();
      setCategories(data.tags || []);
    };

    fetchCategories();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchProducts = async (pageNo) => {
      setIsLoading(true);
      let url;

      if (selectedCategory) {
        url = `https://world.openfoodfacts.org/category/${selectedCategory}.json`;
      } else if (search) {
        url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&page=${pageNo}&json=true`;
      } else {
        url = `https://world.openfoodfacts.org/category/snacks.json?page=${pageNo}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (selectedCategory) {
        setProducts((prev) => [...(data.products || [])]);
      } else {
        setProducts((prev) => [...prev, ...(data.products || [])]);
      }
      setIsLoading(false);
    };

    if (pageNo > 1 || search || selectedCategory) {
      fetchProducts(pageNo);
    }
  }, [pageNo, search, selectedCategory]);

  console.log("products in the state", products);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food Product Explorer</h1>
      <div className="my-4">
        <button
          onClick={() => setSearchMode("name")}
          className={`mr-2 ${
            searchMode === "name" ? "bg-blue-500" : "bg-gray-300"
          } p-2 rounded`}
        >
          Search by Name
        </button>
        <button
          onClick={() => setSearchMode("barcode")}
          className={`mr-2 ${
            searchMode === "barcode" ? "bg-blue-500" : "bg-gray-300"
          } p-2 rounded`}
        >
          Search by Barcode
        </button>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="border p-2 rounded w-1/2"
          placeholder={
            searchMode === "name" ? "Search by name..." : "Enter barcode..."
          }
        />
        <button
          className="bg-blue-500 text-white p-2 rounded ml-2"
          onClick={handleSearch} // This will now call the handleSearch function
        >
          Search
        </button>
      </div>
      <div>
        <label htmlFor="filter">Filter Section: </label>
        <select
          id="filter"
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories &&
            categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
        </select>
      </div>
      <SortComponent sortOption={sortOption} handleSort={handleSort} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading ? (
          <Shimmer />
        ) : (
          products.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))
        )}
      </div>

      <button
        onClick={handleLoadMore}
        className=" my-5 px-4 py-2 bg-blue-500 rounded-sm hover:bg-blue-700 "
      >
        Load More
      </button>
    </div>
  );
};
