// Funkcja do usuwania polskich znaków
export const normalizeString = (str: string) => {
  return str
    .normalize("NFD") // Rozbija znaki na podstawowe i akcenty
    .replace(/[\u0300-\u036f]/g, "") // Usuwa akcenty
    .toLowerCase();
};
