import React from "react";

const FilterButtons = ({ selectedFilter, setSelectedFilter }) => {
  const filters = ["all", "pending", "assigned", "picked-up", "rejected"];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => setSelectedFilter(status)}
          className={`px-5 py-2 rounded-lg shadow-md transition-all duration-300 ${
            selectedFilter === status
              ? "bg-[#175E5E] text-white"
              : "text-[#175E5E] border border-[#175E5E] hover:bg-[#175E5E] hover:text-white"
          }`}
        >
          {status === "all"
            ? "All"
            : status === "picked-up"
            ? "Picked-up"
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
