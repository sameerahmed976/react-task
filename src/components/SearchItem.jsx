import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <>
      <form className="form__search" onSubmit={(e) => e.preventDefault()}>
        <label className="label__search" htmlFor="search"></label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search Item"
          className="search__input"
          role="search item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchItem;
