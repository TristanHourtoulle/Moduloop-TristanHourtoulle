import { AddProductType } from "@models/AddProduct";
import { ProjectType } from "@models/Project";

export function getC02manufacturing(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.rc.manufacturing;
  result += qUsed * product.product.reuse.rc.manufacturing;
  return result.toFixed(0);
}

export function getC02installation(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.rc.installation;
  result += qUsed * product.product.reuse.rc.installation;
  return result.toFixed(0);
}

export function getC02usage(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.rc.usage;
  result += qUsed * product.product.reuse.rc.usage;
  return result.toFixed(0);
}

export function getC02endOfLife(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.rc.endOfLife;
  result += qUsed * product.product.reuse.rc.endOfLife;
  return result.toFixed(0);
}

export function getCO2impact(project: ProjectType) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product.new.rc.manufacturing;
    result += qNew * product.product.new.rc.installation;
    result += qNew * product.product.new.rc.usage;
    result += qNew * product.product.new.rc.endOfLife;
    result += qUsed * product.product.reuse.rc.manufacturing;
    result += qUsed * product.product.reuse.rc.installation;
    result += qUsed * product.product.reuse.rc.usage;
    result += qUsed * product.product.reuse.rc.endOfLife;
  });

  return result.toFixed(0);
}

export function getCO2impactBetweenTwoProjects(
  project1: ProjectType,
  project2: ProjectType
) {
  let result = 0.0;
  if (
    project1.products === undefined ||
    project1.products === null ||
    project2.products === undefined ||
    project2.products === null
  )
    return (result = 0.0);
  project1.products.forEach((product: AddProductType) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product.new.rc.manufacturing;
    result += qNew * product.product.new.rc.installation;
    result += qNew * product.product.new.rc.usage;
    result += qNew * product.product.new.rc.endOfLife;
    result += qUsed * product.product.reuse.rc.manufacturing;
    result += qUsed * product.product.reuse.rc.installation;
    result += qUsed * product.product.reuse.rc.usage;
    result += qUsed * product.product.reuse.rc.endOfLife;
  });
  project2.products.forEach((product: AddProductType) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result -= qNew * product.product.new.rc.manufacturing;
    result -= qNew * product.product.new.rc.installation;
    result -= qNew * product.product.new.rc.usage;
    result -= qNew * product.product.new.rc.endOfLife;
    result -= qUsed * product.product.reuse.rc.manufacturing;
    result -= qUsed * product.product.reuse.rc.installation;
    result -= qUsed * product.product.reuse.rc.usage;
    result -= qUsed * product.product.reuse.rc.endOfLife;
  });

  return result.toFixed(0);
}

export function getCO2impactByProduct(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.rc.manufacturing;
  result += qNew * product.product.new.rc.installation;
  result += qNew * product.product.new.rc.usage;
  result += qNew * product.product.new.rc.endOfLife;
  result += qUsed * product.product.reuse.rc.manufacturing;
  result += qUsed * product.product.reuse.rc.installation;
  result += qUsed * product.product.reuse.rc.usage;
  result += qUsed * product.product.reuse.rc.endOfLife;

  return result.toFixed(0);
}

export function getERFimpact(project: ProjectType) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product.new.erf.manufacturing;
    result += qNew * product.product.new.erf.installation;
    result += qNew * product.product.new.erf.usage;
    result += qNew * product.product.new.erf.endOfLife;
    result += qUsed * product.product.reuse.erf.manufacturing;
    result += qUsed * product.product.reuse.erf.installation;
    result += qUsed * product.product.reuse.erf.usage;
    result += qUsed * product.product.reuse.erf.endOfLife;
  });

  return result.toFixed(0);
}

export function getERFimpactBetweenTwoProjects(
  project1: ProjectType,
  project2: ProjectType
) {
  let result = 0.0;
  if (
    project1.products === undefined ||
    project1.products === null ||
    project2.products === undefined ||
    project2.products === null
  )
    return (result = 0.0);
  project1.products.forEach((product: AddProductType) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product.new.erf.manufacturing;
    result += qNew * product.product.new.erf.installation;
    result += qNew * product.product.new.erf.usage;
    result += qNew * product.product.new.erf.endOfLife;
    result += qUsed * product.product.reuse.erf.manufacturing;
    result += qUsed * product.product.reuse.erf.installation;
    result += qUsed * product.product.reuse.erf.usage;
    result += qUsed * product.product.reuse.erf.endOfLife;
  });
  project2.products.forEach((product: AddProductType) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result -= qNew * product.product.new.erf.manufacturing;
    result -= qNew * product.product.new.erf.installation;
    result -= qNew * product.product.new.erf.usage;
    result -= qNew * product.product.new.erf.endOfLife;
    result -= qUsed * product.product.reuse.erf.manufacturing;
    result -= qUsed * product.product.reuse.erf.installation;
    result -= qUsed * product.product.reuse.erf.usage;
    result -= qUsed * product.product.reuse.erf.endOfLife;
  });

  return result.toFixed(0);
}

export function getERFimpactByProduct(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.erf.manufacturing;
  result += qNew * product.product.new.erf.installation;
  result += qNew * product.product.new.erf.usage;
  result += qNew * product.product.new.erf.endOfLife;
  result += qUsed * product.product.reuse.erf.manufacturing;
  result += qUsed * product.product.reuse.erf.installation;
  result += qUsed * product.product.reuse.erf.usage;
  result += qUsed * product.product.reuse.erf.endOfLife;

  return result.toFixed(0);
}

export function getERFmanufacturing(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.erf.manufacturing;
  result += qUsed * product.product.reuse.erf.manufacturing;
  return result.toFixed(0);
}

export function getERFinstallation(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.erf.installation;
  result += qUsed * product.product.reuse.erf.installation;
  return result.toFixed(0);
}

export function getERFusage(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.erf.usage;
  result += qUsed * product.product.reuse.erf.usage;
  return result.toFixed(0);
}

export function getERFendOfLife(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.erf.endOfLife;
  result += qUsed * product.product.reuse.erf.endOfLife;
  return result.toFixed(0);
}

export function getASEimpact(project: ProjectType) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product.new.ase.manufacturing;
    result += qNew * product.product.new.ase.installation;
    result += qNew * product.product.new.ase.usage;
    result += qNew * product.product.new.ase.endOfLife;
    result += qUsed * product.product.reuse.ase.manufacturing;
    result += qUsed * product.product.reuse.ase.installation;
    result += qUsed * product.product.reuse.ase.usage;
    result += qUsed * product.product.reuse.ase.endOfLife;
  });

  return result.toFixed(0);
}

export function getASEimpactByProduct(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.ase.manufacturing;
  result += qNew * product.product.new.ase.installation;
  result += qNew * product.product.new.ase.usage;
  result += qNew * product.product.new.ase.endOfLife;
  result += qUsed * product.product.reuse.ase.manufacturing;
  result += qUsed * product.product.reuse.ase.installation;
  result += qUsed * product.product.reuse.ase.usage;
  result += qUsed * product.product.reuse.ase.endOfLife;

  return result.toFixed(0);
}

export function getASEmanufacturing(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.ase.manufacturing;
  result += qUsed * product.product.reuse.ase.manufacturing;
  return result.toFixed(0);
}

export function getASEinstallation(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.ase.installation;
  result += qUsed * product.product.reuse.ase.installation;
  return result.toFixed(0);
}

export function getASEusage(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.ase.usage;
  result += qUsed * product.product.reuse.ase.usage;
  return result.toFixed(0);
}

export function getASEendOfLife(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.ase.endOfLife;
  result += qUsed * product.product.reuse.ase.endOfLife;
  return result.toFixed(0);
}

export function getEMimpact(project: ProjectType) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product.new.em.manufacturing;
    result += qNew * product.product.new.em.installation;
    result += qNew * product.product.new.em.usage;
    result += qNew * product.product.new.em.endOfLife;
    result += qUsed * product.product.reuse.em.manufacturing;
    result += qUsed * product.product.reuse.em.installation;
    result += qUsed * product.product.reuse.em.usage;
    result += qUsed * product.product.reuse.em.endOfLife;
  });

  return result.toFixed(3);
}

export function getEMimpactByProduct(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.em.manufacturing;
  result += qNew * product.product.new.em.installation;
  result += qNew * product.product.new.em.usage;
  result += qNew * product.product.new.em.endOfLife;
  result += qUsed * product.product.reuse.em.manufacturing;
  result += qUsed * product.product.reuse.em.installation;
  result += qUsed * product.product.reuse.em.usage;
  result += qUsed * product.product.reuse.em.endOfLife;

  return result.toFixed(3);
}

export function getEMmanufacturing(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.em.manufacturing;
  result += qUsed * product.product.reuse.em.manufacturing;
  return result.toFixed(3);
}

export function getEMinstallation(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.em.installation;
  result += qUsed * product.product.reuse.em.installation;
  return result.toFixed(3);
}

export function getEMusage(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.em.usage;
  result += qUsed * product.product.reuse.em.usage;
  return result.toFixed(3);
}

export function getEMendOfLife(product: AddProductType) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product.new.em.endOfLife;
  result += qUsed * product.product.reuse.em.endOfLife;
  return result.toFixed(3);
}
