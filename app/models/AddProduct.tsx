import { ProductType } from "./Product";

export interface AddProductType {
    product: ProductType[],
    idProject: number,
    qNew: number,
    qUsed: number,
    addOn: string | null,
    updatedOn: string | null
}