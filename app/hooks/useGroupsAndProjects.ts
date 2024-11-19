import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGroups, fetchProjects } from "@utils/api";

// Hook pour récupérer les groupes
export const useGroups = (userId: string) => {
  return useQuery({
    queryKey: ["groups", userId],
    queryFn: () => fetchGroups(userId),
    staleTime: 60 * 1000, // Les groupes restent frais pendant 1 minute
    // Les groupes sont en cache pendant 5 minutes
  });
};

// Hook pour récupérer les projets
export const useProjects = (userId: string, groups: any[]) => {
  return useQuery({
    queryKey: ["projects", userId],
    queryFn: () => fetchProjects(userId, groups),
    enabled: groups.length > 0, // Le hook s'active uniquement si les groupes sont chargés
    staleTime: 60 * 1000,
    // Les projets sont en cache pendant 5 minutes
  });
};

// Hook pour mettre à jour manuellement les projets ou groupes localement
export const useUpdateQueryCache = () => {
  const queryClient = useQueryClient();

  const updateProjects = (userId: string, newProjects: any[]) => {
    queryClient.setQueryData(["projects", userId], newProjects);
  };

  const updateGroups = (userId: string, newGroups: any[]) => {
    queryClient.setQueryData(["groups", userId], newGroups);
  };

  return { updateProjects, updateGroups };
};
