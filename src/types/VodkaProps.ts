// Types
export interface VodkaProps {
  _id: string;
  name: string;
  imageSrc: string;
  alcoholPercentage: number;
  flavor: VodkaFlavor;
  variants: VodkaVariant[];
  description?: string;
  selectedVariant?: VodkaVariant;
}

// Flavior options in /constants/filterOptions.ts
export type VodkaFlavor =
  | "pure"
  | "mint"
  | "lemon"
  | "cherry"
  | "currant"
  | "mango";

export interface VodkaVariant {
  volume: number;
  stores: Store[];
  averagePrice?: number;
}

export interface PriceHistory {
  date: Date;
  price: number;
}

export interface Store {
  name: string;
  image: string;
  priceHistory: PriceHistory[];
  price: number;
}

export interface InputGroupProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
}

export type StoreComponentProps = {
  store: Store;
  className?: string;
  isAdmin?: boolean;
  setFormData?: React.Dispatch<React.SetStateAction<VodkaFormData>>;
  variantIndex?: number;
};

// Form Data
export interface VodkaFormData {
  _id?: string;
  name: string;
  imageSrc: string;
  alcoholPercentage: number;
  flavor: string;
  variants: VodkaVariant[];
  description: string;
}
