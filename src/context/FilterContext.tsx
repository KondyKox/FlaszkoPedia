"use client";

import {
  BOTTLE_SIZE_OPTIONS,
  VODKA_FLAVOR_OPTIONS,
} from "@/constants/filterOptions";
import { FilterOptions } from "@/types/FilterProps";
import { createContext, useState } from "react";

export const FilterContext = createContext<FilterOptions | undefined>(
  undefined
);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [bottleSizeFilter, setBottleSizeFilter] = useState<number>(
    BOTTLE_SIZE_OPTIONS[0].value
  );
  const [flavorFilter, setFlavorFilter] = useState<string>(
    VODKA_FLAVOR_OPTIONS[0].value
  );

  return (
    <FilterContext.Provider
      value={{
        sortBy,
        setSortBy,
        sortAscending,
        setSortAscending,
        bottleSizeFilter,
        setBottleSizeFilter,
        flavorFilter,
        setFlavorFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
