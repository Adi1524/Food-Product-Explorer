import React from "react";

const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array(6) // Adjust the number of shimmer placeholders
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse w-50vw border p-4 rounded-md bg-gray-200"
          >
            <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
