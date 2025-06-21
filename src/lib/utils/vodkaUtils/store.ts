import { STORE_LIST } from "@/constants/stores";

export const getStoreColor = (storeName: string) =>
  STORE_LIST.find((s) => s.name === storeName)?.color || "#8884d8";

// export const getStoreImage = (storeName: string) =>
//   STORE_LIST.find((s) => s.name === storeName)?.image || "";
