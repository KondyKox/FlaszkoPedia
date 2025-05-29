import { FilterProvider } from "@/context/FilterContext";
import { SelectedVodkaProvider } from "@/context/SelectedVodkaContext";

export default function VodkasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FilterProvider>
      <SelectedVodkaProvider>{children}</SelectedVodkaProvider>
    </FilterProvider>
  );
}
