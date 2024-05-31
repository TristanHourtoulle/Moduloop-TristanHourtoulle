export function getPlaneEquivalence(value: any) {
  let delta = value / 100; // Convertir kg en tonnes
  let result = delta / 0.524;
  return result.toFixed(0);
}

export function getPersonEquivalence(value: any) {
  let result = value / 24.38;
  return result.toFixed(0);
}

export function getKilometersEquivalence(value: any) {
  let result = value * 0.17;
  return result.toFixed(0);
}

export function getPetrolEquivalence(value: any) {
  let result = value / 5861.52;
  return result.toFixed(0);
}

export function getHouseEquivalence(value: any) {
  let result = value * 0.2778; // Convert MJ to kWh
  result = result / (2223 / 365);
  return result.toFixed(0);
}

export function getPercentage(valueOne: any, valueTwo: any) {
  if (valueOne >= valueTwo) {
    let delta = valueOne - valueTwo;
    let result = (delta / valueOne) * 100;
    return result.toFixed(0);
  } else {
    let delta = valueTwo - valueOne;
    let result = (delta / valueTwo) * 100;
    return result.toFixed(0);
  }
}

export function getC02manufacturing(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew ?? 0;
  let qUsed = product.qUsed ?? 0;

  result += qNew * (product.product[0]?.new?.rc?.manufacturing ?? 0);
  result += qUsed * (product.product[0]?.reuse?.rc?.manufacturing ?? 0);
  return result.toFixed(0);
}

export function getC02installation(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.rc.installation;
  result += qUsed * product.product[0].reuse.rc.installation;
  return result.toFixed(0);
}

export function getC02usage(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.rc.usage;
  result += qUsed * product.product[0].reuse.rc.usage;
  return result.toFixed(0);
}

export function getC02endOfLife(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.rc.endOfLife;
  result += qUsed * product.product[0].reuse.rc.endOfLife;
  return result.toFixed(0);
}

export function getCO2impact(project: any) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product[0].new.rc.manufacturing;
    result += qNew * product.product[0].new.rc.installation;
    result += qNew * product.product[0].new.rc.usage;
    result += qNew * product.product[0].new.rc.endOfLife;
    result += qUsed * product.product[0].reuse.rc.manufacturing;
    result += qUsed * product.product[0].reuse.rc.installation;
    result += qUsed * product.product[0].reuse.rc.usage;
    result += qUsed * product.product[0].reuse.rc.endOfLife;
  });

  return result.toFixed(0);
}

export function getCO2impactBetweenTwoProjects(project1: any, project2: any) {
  let result = 0.0;
  if (
    project1.products === undefined ||
    project1.products === null ||
    project2.products === undefined ||
    project2.products === null
  )
    return (result = 0.0);
  project1.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product[0].new.rc.manufacturing;
    result += qNew * product.product[0].new.rc.installation;
    result += qNew * product.product[0].new.rc.usage;
    result += qNew * product.product[0].new.rc.endOfLife;
    result += qUsed * product.product[0].reuse.rc.manufacturing;
    result += qUsed * product.product[0].reuse.rc.installation;
    result += qUsed * product.product[0].reuse.rc.usage;
    result += qUsed * product.product[0].reuse.rc.endOfLife;
  });
  project2.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result -= qNew * product.product[0].new.rc.manufacturing;
    result -= qNew * product.product[0].new.rc.installation;
    result -= qNew * product.product[0].new.rc.usage;
    result -= qNew * product.product[0].new.rc.endOfLife;
    result -= qUsed * product.product[0].reuse.rc.manufacturing;
    result -= qUsed * product.product[0].reuse.rc.installation;
    result -= qUsed * product.product[0].reuse.rc.usage;
    result -= qUsed * product.product[0].reuse.rc.endOfLife;
  });

  return result.toFixed(0);
}

export function getCO2impactByProduct(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.rc.manufacturing;
  result += qNew * product.product[0].new.rc.installation;
  result += qNew * product.product[0].new.rc.usage;
  result += qNew * product.product[0].new.rc.endOfLife;
  result += qUsed * product.product[0].reuse.rc.manufacturing;
  result += qUsed * product.product[0].reuse.rc.installation;
  result += qUsed * product.product[0].reuse.rc.usage;
  result += qUsed * product.product[0].reuse.rc.endOfLife;

  return result.toFixed(0);
}

export function getERFimpact(project: any) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product[0].new.erf.manufacturing;
    result += qNew * product.product[0].new.erf.installation;
    result += qNew * product.product[0].new.erf.usage;
    result += qNew * product.product[0].new.erf.endOfLife;
    result += qUsed * product.product[0].reuse.erf.manufacturing;
    result += qUsed * product.product[0].reuse.erf.installation;
    result += qUsed * product.product[0].reuse.erf.usage;
    result += qUsed * product.product[0].reuse.erf.endOfLife;
  });

  return result.toFixed(0);
}

export function getERFimpactBetweenTwoProjects(project1: any, project2: any) {
  let result = 0.0;
  if (
    project1.products === undefined ||
    project1.products === null ||
    project2.products === undefined ||
    project2.products === null
  )
    return (result = 0.0);
  project1.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product[0].new.erf.manufacturing;
    result += qNew * product.product[0].new.erf.installation;
    result += qNew * product.product[0].new.erf.usage;
    result += qNew * product.product[0].new.erf.endOfLife;
    result += qUsed * product.product[0].reuse.erf.manufacturing;
    result += qUsed * product.product[0].reuse.erf.installation;
    result += qUsed * product.product[0].reuse.erf.usage;
    result += qUsed * product.product[0].reuse.erf.endOfLife;
  });
  project2.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result -= qNew * product.product[0].new.erf.manufacturing;
    result -= qNew * product.product[0].new.erf.installation;
    result -= qNew * product.product[0].new.erf.usage;
    result -= qNew * product.product[0].new.erf.endOfLife;
    result -= qUsed * product.product[0].reuse.erf.manufacturing;
    result -= qUsed * product.product[0].reuse.erf.installation;
    result -= qUsed * product.product[0].reuse.erf.usage;
    result -= qUsed * product.product[0].reuse.erf.endOfLife;
  });

  return result.toFixed(0);
}

export function getERFimpactByProduct(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.erf.manufacturing;
  result += qNew * product.product[0].new.erf.installation;
  result += qNew * product.product[0].new.erf.usage;
  result += qNew * product.product[0].new.erf.endOfLife;
  result += qUsed * product.product[0].reuse.erf.manufacturing;
  result += qUsed * product.product[0].reuse.erf.installation;
  result += qUsed * product.product[0].reuse.erf.usage;
  result += qUsed * product.product[0].reuse.erf.endOfLife;

  return result.toFixed(0);
}

export function getERFmanufacturing(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.erf.manufacturing;
  result += qUsed * product.product[0].reuse.erf.manufacturing;
  return result.toFixed(0);
}

export function getERFinstallation(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.erf.installation;
  result += qUsed * product.product[0].reuse.erf.installation;
  return result.toFixed(0);
}

export function getERFusage(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.erf.usage;
  result += qUsed * product.product[0].reuse.erf.usage;
  return result.toFixed(0);
}

export function getERFendOfLife(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.erf.endOfLife;
  result += qUsed * product.product[0].reuse.erf.endOfLife;
  return result.toFixed(0);
}

export function getASEimpact(project: any) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product[0].new.ase.manufacturing;
    result += qNew * product.product[0].new.ase.installation;
    result += qNew * product.product[0].new.ase.usage;
    result += qNew * product.product[0].new.ase.endOfLife;
    result += qUsed * product.product[0].reuse.ase.manufacturing;
    result += qUsed * product.product[0].reuse.ase.installation;
    result += qUsed * product.product[0].reuse.ase.usage;
    result += qUsed * product.product[0].reuse.ase.endOfLife;
  });

  return result.toFixed(0);
}

export function getASEimpactByProduct(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.ase.manufacturing;
  result += qNew * product.product[0].new.ase.installation;
  result += qNew * product.product[0].new.ase.usage;
  result += qNew * product.product[0].new.ase.endOfLife;
  result += qUsed * product.product[0].reuse.ase.manufacturing;
  result += qUsed * product.product[0].reuse.ase.installation;
  result += qUsed * product.product[0].reuse.ase.usage;
  result += qUsed * product.product[0].reuse.ase.endOfLife;

  return result.toFixed(0);
}

export function getASEmanufacturing(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.ase.manufacturing;
  result += qUsed * product.product[0].reuse.ase.manufacturing;
  return result.toFixed(0);
}

export function getASEinstallation(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.ase.installation;
  result += qUsed * product.product[0].reuse.ase.installation;
  return result.toFixed(0);
}

export function getASEusage(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.ase.usage;
  result += qUsed * product.product[0].reuse.ase.usage;
  return result.toFixed(0);
}

export function getASEendOfLife(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.ase.endOfLife;
  result += qUsed * product.product[0].reuse.ase.endOfLife;
  return result.toFixed(0);
}

export function getEMimpact(project: any) {
  let result = 0.0;
  if (project.products === undefined || project.products === null)
    return (result = 0.0);
  project.products.forEach((product: any) => {
    let qNew = product.qNew;
    let qUsed = product.qUsed;

    result += qNew * product.product[0].new.em.manufacturing;
    result += qNew * product.product[0].new.em.installation;
    result += qNew * product.product[0].new.em.usage;
    result += qNew * product.product[0].new.em.endOfLife;
    result += qUsed * product.product[0].reuse.em.manufacturing;
    result += qUsed * product.product[0].reuse.em.installation;
    result += qUsed * product.product[0].reuse.em.usage;
    result += qUsed * product.product[0].reuse.em.endOfLife;
  });

  return result.toFixed(3);
}

export function getEMimpactByProduct(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.em.manufacturing;
  result += qNew * product.product[0].new.em.installation;
  result += qNew * product.product[0].new.em.usage;
  result += qNew * product.product[0].new.em.endOfLife;
  result += qUsed * product.product[0].reuse.em.manufacturing;
  result += qUsed * product.product[0].reuse.em.installation;
  result += qUsed * product.product[0].reuse.em.usage;
  result += qUsed * product.product[0].reuse.em.endOfLife;

  return result.toFixed(3);
}

export function getEMmanufacturing(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.em.manufacturing;
  result += qUsed * product.product[0].reuse.em.manufacturing;
  return result.toFixed(3);
}

export function getEMinstallation(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.em.installation;
  result += qUsed * product.product[0].reuse.em.installation;
  return result.toFixed(3);
}

export function getEMusage(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.em.usage;
  result += qUsed * product.product[0].reuse.em.usage;
  return result.toFixed(3);
}

export function getEMendOfLife(product: any) {
  let result = 0.0;
  if (product === undefined || product === null) return (result = 0.0);
  let qNew = product.qNew;
  let qUsed = product.qUsed;

  result += qNew * product.product[0].new.em.endOfLife;
  result += qUsed * product.product[0].reuse.em.endOfLife;
  return result.toFixed(3);
}
