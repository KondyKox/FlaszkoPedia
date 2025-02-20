import Store from "./StoreProps";

interface Vodka {
  _id: string;
  name: string;
  averagePrice: number;
  bottleSize: number;
  alcoholPercentage: number;
  stores: Store[];
  // image: string;
}

export default Vodka;
