import {
  databaseToProjectModel,
  databaseToSeveralGroupModel,
} from "@utils/convert";
import { getGroupsByUserId } from "@utils/database/group";
import { getProjectsByUserId } from "@utils/database/project";

// Fonction pour récupérer les groupes d'un utilisateur
export const fetchGroups = async (userId: string) => {
  const groupRes = await getGroupsByUserId(Number(userId));
  if (!groupRes) throw new Error("Failed to fetch groups");
  return databaseToSeveralGroupModel(groupRes).concat({
    id: -1,
    name: "Tous les groupes",
    description: "",
    budget: "0",
    user_id: Number(userId),
    image: "",
  });
};

// Fonction pour récupérer les projets d'un utilisateur
export const fetchProjects = async (userId: string, groups: any[]) => {
  const projectRes = await getProjectsByUserId(Number(userId));
  if (!projectRes) throw new Error("Failed to fetch projects");
  return databaseToProjectModel(projectRes).map((project) => {
    const groupInfo = groups.find((group) => group.id === project.group) || {
      id: -1,
      name: "Aucun Groupe",
      description: "",
      budget: "0",
      user_id: Number(userId),
      image: "",
    };
    return { ...project, groupInfo };
  });
};
