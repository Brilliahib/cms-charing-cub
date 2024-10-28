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
        <div className="flex justify-center items-center h-10 rounded-l-md bg-gray-200 px-3 py-2 text-sm">
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
