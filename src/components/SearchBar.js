import React from "react";

const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search songs..."
    className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    onChange={(e) => onSearch(e.target.value)}
  />
);

export default SearchBar;
