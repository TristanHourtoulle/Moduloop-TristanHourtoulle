import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";

export function isProductInProject(
  product: AddProductType,
  project: ProjectType
) {
  let retValue: AddProductType | null = null;

  if (project.products) {
    for (const item of project.products) {
      if (Number(item.product.id) == Number(product.product.id)) {
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
    if (item.product.id !== idProduct) {
      res.push(item);
    }
  }
  return res;
}

export function getProductByBase(products: ProductType[], baseName: string) {
  let res: ProductType[] = [];

  console.log("Base name to search: ", baseName);
  for (let item of products) {
    console.log("Item base: ", item.base);
    if (item.base === baseName) {
      console.log("Item found: ", item.base);
      res.push(item);
    } else {
    }
  }

  return res;
}

export function convertProjectToUsedProducts(
  products: AddProductType[],
  project: ProjectType
) {
  // Créer une copie profonde de l'objet project
  const tempProject: ProjectType = JSON.parse(JSON.stringify(project));

  if (Array.isArray(products)) {
    // Créer une copie profonde des produits
    const tempProducts: AddProductType[] = JSON.parse(JSON.stringify(products));

    for (let item of tempProducts) {
      let qNew = item.qNew;

      item.qUsed = qNew + item.qUsed;
      item.qNew = 0;
    }
    tempProject.products = tempProducts;
    tempProject.name = tempProject.name + " (REEMPLOI)";
  }
  return tempProject;
}

export function convertProjectToNewProducts(
  products: AddProductType[],
  project: ProjectType
) {
  // Créer une copie profonde de l'objet project
  const tempProject: ProjectType = JSON.parse(JSON.stringify(project));

  if (Array.isArray(products)) {
    // Créer une copie profonde des produits
    const tempProducts: AddProductType[] = JSON.parse(JSON.stringify(products));

    for (let item of tempProducts) {
      let qUsed = item.qUsed;

      item.qNew = qUsed + item.qNew;
      item.qUsed = 0;
    }
    tempProject.products = tempProducts;
    tempProject.name = tempProject.name + " (NEUF)";
  }
  return tempProject;
}
