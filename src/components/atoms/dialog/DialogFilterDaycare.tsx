import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";
import { locations } from "@/utils/location";

interface DialogFilterDaycareProps {
  onFilterChange: (location: string) => void;
}

export default function DialogFilterDaycare({
  onFilterChange,
}: DialogFilterDaycareProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [comboBoxOpen, setComboBoxOpen] = useState(false);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    onFilterChange(location);
    setComboBoxOpen(false);
  };

  return (
    <Popover open={comboBoxOpen} onOpenChange={setComboBoxOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={comboBoxOpen}
          className="md:w-[200px] w-full justify-between font-normal"
        >
          {selectedLocation
            ? locations.find((location) => location.value === selectedLocation)
                ?.label || "Tanpa Filter"
            : "All Locations"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[200px] w-full p-0">
        <Command>
          <CommandInput placeholder="Search location..." className="h-9" />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                value=""
                onSelect={() => handleLocationChange("")}
                className="font-normal"
              >
                All Locations
                <Check
                  className={`ml-auto ${
                    selectedLocation === "" ? "opacity-100" : "opacity-0"
                  }`}
                />
              </CommandItem>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    const newValue =
                      currentValue === selectedLocation ? "" : currentValue;
                    handleLocationChange(newValue);
                  }}
                  className="font-normal"
                >
                  {location.label}
                  <Check
                    className={`ml-auto ${
                      selectedLocation === location.value
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
