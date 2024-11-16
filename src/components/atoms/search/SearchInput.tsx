"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <>
      <div
        className={cn(
          `flex items-center rounded-full border w-[300px] ${className}`
        )}
      >
        <div className="flex justify-center items-center h-10 rounded-l-full bg-white pl-6 pr-2 py-4 text-sm">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={handleChange}
          className="w-full border bg-white md:max-w-xs w-full border-none rounded-l-none rounded-r-full py-4 focus:outline-none"
        />
      </div>
    </>
  );
};

export default SearchInput;
