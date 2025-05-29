import { Dispatch, SetStateAction } from "react";

export interface FilterOptions {
  sortBy: string;
  sortAscending: boolean;
  bottleSizeFilter: number;
  flavorFilter: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  setSortAscending: Dispatch<SetStateAction<boolean>>;
  setBottleSizeFilter: Dispatch<SetStateAction<number>>;
  setFlavorFilter: Dispatch<SetStateAction<string>>;
}

export interface FilterPanelProps {
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface FilterListProps<T> {
  id: string;
  label: string;
  options: { label: string; value: T }[];
  selectedValue: T | null;
  onChange: (value: T) => void;
}
