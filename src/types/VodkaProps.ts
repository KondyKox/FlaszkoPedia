export interface Vodka {
  _id: string;
  name: string;
  alcoholPercentage: number;
  flavor: string;
  variants: VodkaVariant[];
  imageSrc: string;
  description?: string;
  selectedVariant?: VodkaVariant;
}

export interface VodkaVariant {
  volume: number;
  stores: Store[];
  averagePrice: number;
}

export interface VodkaComponentProps {
  vodka: Vodka;
  handleVariantChange: (vodkaId: string, variant: VodkaVariant) => void;
}

export interface Store {
  name: string;
  price: number;
  image: string;
}

export type StoreComponentProps = {
  store: Store;
  className?: string;
};
