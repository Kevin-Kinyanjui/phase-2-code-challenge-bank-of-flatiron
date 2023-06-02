import React from "react";

function Search({ onSearch }) {
  function handleSearch(event) {
    onSearch(event.target.value);
  }
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
