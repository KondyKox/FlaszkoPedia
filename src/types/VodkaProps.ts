export interface Vodka {
  _id: string;
  name: string;
  alcoholPercentage: number;
  flavor: string;
  variants: VodkaVariant[];
  imageSrc: string;
  description?: string;
}

export interface VodkaVariant {
  volume: number;
  stores: Store[];
  averagePrice: number;
}

export interface Store {
  name: string;
  price: number;
  image: string;
}
