"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchQueryInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

const SearchQueryInput: React.FC<SearchQueryInputProps> = ({
  value,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <>
      <div
        className={cn(
          `flex items-center rounded-xl border md:w-[250px] w-full font-figtree ${className}`
        )}
      >
        <div className="flex justify-center items-center h-10 rounded-l-xl pl-4 pr-1 py-4 text-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-md border bg-white md:max-w-xs w-full border-none rounded-l-none rounded-r-xl py-4 focus:outline-none"
        />
      </div>
    </>
  );
};

export default SearchQueryInput;
