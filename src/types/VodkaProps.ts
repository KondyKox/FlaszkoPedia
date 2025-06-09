// Types
export interface Vodka {
  _id: string;
  name: string;
  imageSrc: string;
  alcoholPercentage: number;
  flavor: string;
  variants: VodkaVariant[];
  description?: string;
  selectedVariant?: VodkaVariant;
}

export interface VodkaVariant {
  volume: number;
  stores: Store[];
  averagePrice: number;
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

// Component props
export interface VodkaComponentProps {
  vodka: Vodka;
  handleVariantChange?: (vodkaId: string, variant: VodkaVariant) => void;
}

export type StoreComponentProps = {
  store: Store;
  className?: string;
};
