import { AddProductType } from "./AddProduct";

export interface GlobalImpact {
  rc: {
    manufacturing: 0;
    installation: 0;
    usage: 0;
    endOfLife: 0;
  };
  erf: {
    manufacturing: 0;
    installation: 0;
    usage: 0;
    endOfLife: 0;
  };
  ase: {
    manufacturing: 0;
    installation: 0;
    usage: 0;
    endOfLife: 0;
  };
  em: {
    manufacturing: 0;
    installation: 0;
    usage: 0;
    endOfLife: 0;
  };
}

export interface ProductImpact {
  manufacturing: number;
  installation: number;
  usage: number;
  endOfLife: number;
  total: number;
  product: AddProductType;
  percentage: number;
}
