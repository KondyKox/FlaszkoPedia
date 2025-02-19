import Store from "./StoreProps";

interface Vodka {
  id: number;
  name: string;
  averagePrice: number;
  bottleSize: number;
  alcoholPercentage: number;
  stores: Store[];
  // image: string;
}

export default Vodka;
