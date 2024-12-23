"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  onSearch: (query: string) => void;
  className?: string;
  props?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  className,
  props,
}) => {
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
          `flex items-center rounded-xl border w-[200px] font-figtree ${className}`
        )}
      >
        <div className="flex justify-center items-center h-10 rounded-l-xl bg-white pl-4 pr-1 py-4 text-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder={props}
          value={query}
          onChange={handleChange}
          className="w-full text-md border bg-white md:max-w-xs w-full border-none rounded-l-none rounded-r-xl py-4 focus:outline-none"
        />
      </div>
    </>
  );
};

export default SearchInput;
