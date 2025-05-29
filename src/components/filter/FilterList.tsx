import { FilterListProps } from "@/types/FilterProps";

const FilterList = <T extends string | number>({
  id,
  label,
  options,
  selectedValue,
  onChange,
}: FilterListProps<T>) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="filter-label">
        {label}
      </label>
      <ul id={id} className="w-full grid place-items-stretch grid-cols-2 gap-2">
        {options.map((option) => (
          <li
            key={String(option.value)}
            value={String(option.value)}
            onClick={() => onChange(option.value)}
            className={`filter ${
              selectedValue === option.value
                ? "bg-slate-300 text-button pointer-events-none"
                : "text-primary"
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterList;
