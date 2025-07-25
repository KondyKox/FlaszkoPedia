// Get vodka description from Wikipedia
export const getWikiDescription = async (name: string): Promise<string> => {
  const formattedName = `${name} (wódka)`;

  try {
    const res = await fetch(
      `https://pl.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        formattedName
      )}`
    );

    if (!res.ok) {
      throw new Error(
        `Error fetching Wikipedia description. Status: ${res.status}`
      );
    }

    const data = await res.json();
    return data.extract || "Brak opisu wódki z Wikipedii. :(";
  } catch (error) {
    console.error("Wikipedia fetch failed:", error);
    return "Brak opisu wódki z Wikipedii. :(";
  }
};
