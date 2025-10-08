import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchBarWrapper}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.searchBarInput}
      />
    </div>
  );
};

export default SearchBar;
