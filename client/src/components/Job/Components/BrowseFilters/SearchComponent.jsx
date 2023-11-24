import { useState, useEffect } from "react";

export default function SearchComponent({ onSearch, initialQuery }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
