import React, { useState } from "react";
import history from "../../history";

function SearchBar() {
  const [input, setInput] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?title=${input}`);
  };

  return (
    <form className="search" onSubmit={onSearchSubmit}>
      <input
        type="text"
        className="searchbar"
        placeholder="search by author, title or series"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button className="search-icon">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;
