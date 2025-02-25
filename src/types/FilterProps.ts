import { Dispatch, SetStateAction } from "react";

export interface FilterOptionsProps {
  setSearch: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  sortAscending: boolean;
  setSortAscending: Dispatch<SetStateAction<boolean>>;
  setBottleSizeFilter: Dispatch<SetStateAction<number>>;
  bottleSizeFilter: number;
  flavorFilter: string;
  setFlavorFilter: Dispatch<SetStateAction<string>>;
}

export interface FilterListProps<T> {
  id: string;
  label: string;
  options: { label: string; value: T }[];
  selectedValue: T | null;
  onChange: (value: T) => void;
}
