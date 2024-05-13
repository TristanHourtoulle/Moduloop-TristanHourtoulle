import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";

export function isProductInProject(product: any, project: any) {
  let retValue: AddProductType | null = null;

  if (project.products) {
    for (const item of project.products) {
      if (Number(item.product[0].id) == Number(product.product[0].id)) {
        retValue = {
          product: product.product,
          idProject: product.idProject,
          qNew: product.qNew + item.qNew,
          qUsed: product.qUsed + item.qUsed,
          addOn: item.addOn,
          updatedOn: product.updatedOn,
        };
        return retValue;
      }
    }
  }
  return retValue;
}

export function deleteProductFromProject(idProduct: number, project: any) {
  let res: any[] = [];

  let products = project;
  for (let item of products) {
    if (item.product[0].id !== idProduct) {
      res.push(item);
    }
  }
  return res;
}

export function getProductByBase(products: ProductType[], baseName: string) {
  let res: ProductType[] = [];

  for (let item of products) {
    if (item.base === baseName) {
      res.push(item);
    } else {
    }
  }

  return res;
}

export function convertProjectToUsedProducts(
  products: any,
  project: ProjectType
) {
  // Créer une copie profonde de l'objet project
  const tempProject: ProjectType = JSON.parse(JSON.stringify(project));

  if (Array.isArray(products)) {
    // Créer une copie profonde des produits
    const tempProducts: any = JSON.parse(JSON.stringify(products));

    for (let item of tempProducts) {
      let qNew = item.qNew;

      item.qUsed = qNew + item.qUsed;
      item.qNew = 0;
    }
    tempProject.products = tempProducts;
    tempProject.name = tempProject.name + " (TOUT EN REEMPLOI)";
  }
  return tempProject;
}

export function convertProjectToNewProducts(products: any, project: any) {
  // Créer une copie profonde de l'objet project
  const tempProject: any = JSON.parse(JSON.stringify(project));

  if (Array.isArray(products)) {
    // Créer une copie profonde des produits
    const tempProducts: AddProductType[] = JSON.parse(JSON.stringify(products));

    for (let item of tempProducts) {
      let qUsed = item.qUsed ?? 0;

      item.qNew = qUsed + (item.qNew ?? 0);
      item.qUsed = 0;
    }
    tempProject.products = tempProducts;
    tempProject.name = tempProject.name + " (TOUT EN NEUF)";
  }
  return tempProject;
}
