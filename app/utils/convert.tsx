import { AddProductType } from "@models/AddProduct";
import { GroupType } from "@models/Group";
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";

export function databaseToSingleProductModel(data: any) {
  let product: ProductType = {
    id: data.id,
    name: data.name,
    image: data.image,
    unit: data.unit,
    base: data.base,
    new: data.new,
    reuse: data.reuse,
  };

  return product;
}

export function databaseToGroupModel(data: any) {
  let groups: GroupType[] = [];

  const dataArray = Array.from(data);
  for (let i = 0; i < dataArray.length; i++) {
    let group: GroupType = {
      id: data[i].id,
      name: data[i].name,
      description: data[i].description,
      image: data[i].image,
      budget: data[i].budget,
      user_id: data[i].user_id,
    };
    groups.push(group);
  }

  return groups[0];
}

export function databaseToSeveralGroupModel(data: any) {
  let groups: GroupType[] = [];

  const dataArray = Array.from(data);
  for (let i = 0; i < dataArray.length; i++) {
    let group: GroupType = {
      id: data[i].id,
      name: data[i].name,
      description: data[i].description,
      image: data[i].image,
      budget: data[i].budget,
      user_id: data[i].user_id,
    };
    groups.push(group);
  }

  return groups;
}

export function databaseToProjectModel(data: any) {
  let projects: ProjectType[] = [];

  const dataArray = Array.from(data);
  for (let i = 0; i < dataArray.length; i++) {
    let project: ProjectType = {
      id: data[i].id,
      name: data[i].name,
      description: data[i].description,
      image: data[i].image,
      budget: data[i].budget,
      products: data[i].products,
      company: data[i].company,
      location: data[i].location,
      area: data[i].area,
      user_id: data[i].user_id,
      group: data[i].group_id,
      created_at: data[i].created_at,
      updated_at: data[i].updated_at,
      groupInfo: null,
    };
    projects.push(project);
  }

  return projects;
}

export function databaseToSingleProjectModel(data: any) {
  let products: AddProductType[] = [];

  let project: ProjectType = {
    id: data.id,
    name: data.name,
    description: data.description,
    image: data.image,
    budget: data.budget,
    products: data.products,
    company: data.company,
    location: data.location,
    area: data.area,
    user_id: data.user_id,
    group: data.group_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    groupInfo: null,
  };

  return project;
}
