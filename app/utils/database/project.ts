import { databaseToSingleProjectModel } from "@utils/convert";

export const getProjectsByUserId = async (id: number) => {
  const response = await fetch(`/api/project/list?id=${id}`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.success && data.data.length > 0) {
    return data.data;
  } else {
    return null;
  }
};

export const getProjectById = async (id: number) => {
  const response = await fetch(`/api/project?id=${encodeURIComponent(id)}`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.success && data.product) {
    const projectData = databaseToSingleProjectModel(data.product);
    return projectData;
  } else {
    return null;
  }
};

export const getProjectsByGroup = async (groupId: number, projects: any) => {
  let result = [];

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].group_id === groupId) {
      result.push(projects[i]);
    }
  }
  if (result.length === 0) {
    return null;
  }
  return result;
};

export const createProjectInDatabase = async (project: FormData) => {
  const response = await fetch(`/api/project`, {
    method: "POST",
    body: project,
  });
  const data = await response.json();
  if (data.success && data.data) {
    return data.data;
  }
  return null;
};

export const deleteProject = async (id: number) => {
  let response = await fetch(`/api/project?id_project=${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (data.success) {
    return true;
  }
  return false;
};

export const updateProject = async (project: any) => {
  const response = await fetch(`/api/project`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  if (data.success && data.data) {
    return data.data;
  }
  return null;
};

export const addProductInProject = async (product: any) => {
  let response = await fetch(`/api/project/addProduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  let data = await response.json();
  if (data.success) {
    return true;
  }
  return null;
};

export const updateProductInProject = async (product: any) => {
  let response = await fetch(`/api/project/changeProduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  let data = await response.json();
  if (data.success) {
    return true;
  }
  return null;
};

export const deleteProductInProject = async (
  idProject: number,
  idProduct: number
) => {
  let response = await fetch(
    `/api/project/list?id_project=${idProject}&id_product=${idProduct}`,
    {
      method: "DELETE",
    }
  );
  let data = await response.json();
  if (data.success) {
    return true;
  }
  return false;
};

export const deleteAllProductInProject = async (idProject: number) => {
  let response = await fetch(`/api/project/delete?id_project=${idProject}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return true;
  }
  return false;
};

export const duplicateProject = async (id: number) => {
  let response = await fetch(`/api/project/duplicate?id_project=${id}`, {
    method: "POST",
  });

  if (response.ok) {
    return true;
  }
  return false;
};
