import { ProjectType } from "@models/Project";

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

  return result.toFixed(0);
}
