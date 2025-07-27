import { STORE_LIST } from "@/constants/stores";
import { VodkaFormData } from "@/types/VodkaProps";

export const addVodka = async (formData: VodkaFormData) => {
  try {
    const res = await fetch("/api/admin/vodkas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return {
      message: data.message,
      success: res.ok && data.success !== false,
    };
  } catch (error) {
    console.error("Failed to add vodka:", error);
    return { message: "Ups! Coś poszło nie tak.", success: false };
  }
};

export const updateVodka = async (formData: VodkaFormData) => {
  try {
    const res = await fetch("/api/admin/vodkas", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return {
      message: data.message,
      success: res.ok && data.success !== false,
    };
  } catch (error) {
    console.error("Failed to update vodka:", error);
    return { message: "Ups! Coś poszło nie tak.", success: false };
  }
};

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

// Form data for vodka-modal (editing / adding vodka)
export const getInitialFormData = (
  action: "add" | "edit",
  selectedVodka?: Partial<VodkaFormData> | null
): VodkaFormData => {
  if (action === "edit" && selectedVodka) {
    return {
      _id: selectedVodka._id,
      name: selectedVodka.name ?? "",
      imageSrc: selectedVodka.imageSrc ?? "",
      alcoholPercentage: selectedVodka.alcoholPercentage ?? 40,
      flavor: selectedVodka.flavor ?? "pure",
      variants: selectedVodka.variants ?? [
        {
          volume: 0.5,
          stores: generateEmptyStores(),
        },
        {
          volume: 0.7,
          stores: generateEmptyStores(),
        },
        {
          volume: 1,
          stores: generateEmptyStores(),
        },
      ],
      // description: selectedVodka.description ?? "",
    };
  }

  return {
    name: "",
    imageSrc: "",
    alcoholPercentage: 40,
    flavor: "pure",
    variants: [
      {
        volume: 0.5,
        stores: generateEmptyStores(),
      },
      {
        volume: 0.7,
        stores: generateEmptyStores(),
      },
      {
        volume: 1,
        stores: generateEmptyStores(),
      },
    ],
    // description: "",
  };
};

const generateEmptyStores = () =>
  STORE_LIST.map((store) => ({
    name: store.name,
    image: store.image,
    priceHistory: [],
    price: 0,
  }));
