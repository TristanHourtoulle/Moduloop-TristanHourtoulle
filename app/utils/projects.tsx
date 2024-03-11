import { AddProductType } from "@models/AddProduct"
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";

export function isProductInProject(product: AddProductType, project: ProjectType) {
    let retValue: AddProductType | null = null;

    if (project.products) {
        for (const item of project.products) {
            if (Number(item.product.id) == Number(product.product.id)) {
                retValue = {
                    product: product.product,
                    idProject: product.idProject,
                    qNew: product.qNew + item.qNew,
                    qUsed : product.qUsed + item.qUsed,
                    addOn: item.addOn,
                    updatedOn: product.updatedOn
                }
                return retValue
            }
        }
    }
    return retValue
}

export function deleteProductFromProject(idProduct: number, project: any) {
    let res: any[] = [];

    let products = project;
    for (let item of products) {
        if (item.product.id !== idProduct) {
            res.push(item);
        }
    }
    return res;
}

