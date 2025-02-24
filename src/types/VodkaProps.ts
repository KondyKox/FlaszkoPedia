import Store from "./StoreProps";

interface Vodka {
  _id: string;
  name: string;
  averagePrice: number;
  bottleSize: number;
  alcoholPercentage: number;
  stores: Store[];
  imageSrc: string;
  description?: string;
}

export default Vodka;
