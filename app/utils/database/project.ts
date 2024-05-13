import { databaseToSingleProjectModel } from "@utils/convert";

export const getProjectsByUserId = async (id: number) => {
  const response = await fetch(`/api/project/byUser/${id}`, {
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
  const response = await fetch(`/api/project/${encodeURIComponent(id)}`, {
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
  if (data.success && data.project) {
    return data.project;
  }
  return null;
};

export const deleteProject = async (id: number) => {
  let response = await fetch(`/api/project/${encodeURIComponent(id)}`, {
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

export const updateAllFieldsInProject = async (project: any) => {
  const formData = new FormData();
  formData.append("id", project.id);
  formData.append("name", project.name);
  formData.append("description", project.description);
  formData.append("group", project.group);
  formData.append("products", JSON.stringify(project.products));

  const response = await fetch(`/api/project/allFields`, {
    method: "PUT",
    body: formData,
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
  let response = await fetch(`/api/project/product/${idProject}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return true;
  }
  return false;
};

export const duplicateProject = async (id: number) => {
  let response = await fetch(`/api/project/${id}`, {
    method: "POST",
  });

  if (response.ok) {
    return true;
  }
  return false;
};

export const duplicateProjectFromTemplate = async (formData: FormData) => {
  let response = await fetch(`/api/project/duplicate/template`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.project;
  }
  return null;
};
