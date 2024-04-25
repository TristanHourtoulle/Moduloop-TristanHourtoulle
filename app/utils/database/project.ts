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
  if (data.success && data.data) {
    const projectData = databaseToSingleProjectModel(data.product);
    return projectData;
  } else {
    return null;
  }
};
