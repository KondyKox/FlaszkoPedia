import { PriceHistory } from "@/types/VodkaProps";

const monthNames = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  const day = d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

// Get last date of vodka
export const getLastDateFromHistory = (
  history: PriceHistory[]
): Date | null => {
  if (!history || history.length === 0) {
    console.warn("Brak historii!", history);
    return null;
  }

  const lastDate = new Date(history[history.length - 1].date);

  // Tworzymy nową datę z tym samym rokiem, miesiącem i dniem, ale godzina = 00:00
  const dateOnly = new Date(
    lastDate.getFullYear(),
    lastDate.getMonth(),
    lastDate.getDate()
  );

  return dateOnly;
};
