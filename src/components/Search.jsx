import React from "react";

const Search = ({ search, setSearch }) => {
  return (
    <div className="search-term">
      <h2>{search}</h2>
      <img src="./search.svg" alt="search icon" />
      <input
        type="text"
        placeholder="Search your trending movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
