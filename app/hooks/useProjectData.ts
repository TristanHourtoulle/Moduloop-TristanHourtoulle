import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { databaseToGroupModel } from "@utils/convert";
import { getGroupById } from "@utils/database/group";
import { getProducts } from "@utils/database/product";
import { getProjectById } from "@utils/database/project";

import {
  addProductInProject,
  deleteAllProductInProject,
} from "@utils/database/project";

export const useUpdateProductsInProject = () => {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationKey: ["addProductInProject"],
    mutationFn: async ({ idProject, product, qNew, qUsed }: any) => {
      if (!idProject || !product) {
        throw new Error("Missing required parameters: idProject or product");
      }
      return await addProductInProject({
        idProject,
        product,
        qNew,
        qUsed,
      });
    },
    onSuccess: (_, variables) => {
      // Rafraîchir explicitement les données
      queryClient.refetchQueries({
        queryKey: ["products", variables.idProject],
      });
      queryClient.refetchQueries({
        queryKey: ["project", variables.idProject],
      });
    },
    onError: (error: any) => {
      console.error("Error adding product:", error);
    },
  });

  const clear = useMutation({
    mutationKey: ["deleteAllProductsInProject"],
    mutationFn: async (idProject: number) => {
      if (!idProject) {
        throw new Error("Missing required parameter: idProject");
      }
      return await deleteAllProductInProject(idProject);
    },
    onSuccess: (_, idProject) => {
      queryClient.refetchQueries({ queryKey: ["products", idProject] });
      queryClient.refetchQueries({ queryKey: ["project", idProject] });
    },
    onError: (error: any) => {
      console.error("Error clearing products:", error);
    },
  });

  return {
    add: add.mutateAsync,
    clear: clear.mutateAsync,
  };
};

export const useProject = (projectId: number) =>
  useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const project = await getProjectById(projectId);
      if (project && project.group) {
        const group = await getGroupById(project.group);
        if (group) {
          project.groupInfo = databaseToGroupModel(group);
        }
      }
      return project;
    },
  });

export const useProductsInProject = (projectId: number) =>
  useQuery({
    queryKey: ["products", projectId],
    queryFn: async () => {
      console.log(`Fetching products for project ID: ${projectId}`);
      const project = await getProjectById(projectId);
      console.log("Fetched project:", project);
      if (!project || !project.products) return [];
      return Array.isArray(project.products)
        ? project.products
        : [project.products];
    },
  });

export const useStoreProducts = () =>
  useQuery({
    queryKey: ["storeProducts"],
    queryFn: async () => {
      const products = await getProducts();
      return {
        inies: products.filter((product: any) => product.base === "Inies"),
        autres: products.filter((product: any) => product.base === "Autre"),
      };
    },
  });

export const useUpdateProjectCache = () => {
  const queryClient = useQueryClient();
  return (projectId: number, updatedData: any) => {
    queryClient.setQueryData(["project", projectId], updatedData);
  };
};
