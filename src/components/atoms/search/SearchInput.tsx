"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="h-full flex justify-center items-center h-9 rounded-l-lg border border-input border-r-0 bg-gray-200 px-3">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          placeholder="Cari data..."
          value={query}
          onChange={handleChange}
          className="w-full md:max-w-xs w-full border rounded-l-none rounded-r-lg px-4 py-2 focus:outline-none"
        />
      </div>
    </>
  );
};

export default SearchInput;
