import { Dispatch, SetStateAction } from "react";

type FilterProps = {
  setSearch: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  sortAscending: boolean;
  setSortAscending: Dispatch<SetStateAction<boolean>>;
  setBottleSizeFilter: Dispatch<SetStateAction<string>>;
};

export default FilterProps;
