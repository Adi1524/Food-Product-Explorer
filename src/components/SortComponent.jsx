import React from "react";

const SortComponent = ({ sortOption, handleSort }) => {
  return (
    <div className="my-4">
      <label htmlFor="sort" className="font-semibold mr-2">
        Sort By:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => handleSort(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">None</option>
        <option value="name-asc">Product Name (A-Z)</option>
        <option value="name-desc">Product Name (Z-A)</option>
        <option value="nutrition-asc">Nutrition Grade (Ascending)</option>
        <option value="nutrition-desc">Nutrition Grade (Descending)</option>
      </select>
    </div>
  );
};

export default SortComponent;
