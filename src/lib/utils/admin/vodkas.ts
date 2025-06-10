export const deleteVodka = async (vodkaId: string) => {
  try {
    const res = await fetch("/api/admin/vodkas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vodkaId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return {
      message: data.message,
      success: res.ok && data.success !== false,
    };
  } catch (error) {
    console.error("Failed to delete vodka:", error);
    return { message: "Ups! Coś poszło nie tak.", success: false };
  }
};
