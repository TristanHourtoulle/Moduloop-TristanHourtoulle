"use client";

import Loader from "@components/Loader";
import { ProjectCard } from "@components/projects/ProjectCard";
import {
  useGroups,
  useProjects,
  useUpdateQueryCache,
} from "@hooks/useGroupsAndProjects"; // Les hooks React Query créés
import { getSession } from "@lib/session"; // Conserver la logique de session
import { Button } from "@nextui-org/button";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [selectedGroup, setSelectedGroup] = useState<number>(-1); // ID du groupe sélectionné
  const [user, setUser] = useState<{ id: string } | null>(null);

  const { data: groups = [], isLoading: isGroupsLoading } = useGroups(
    user?.id ?? ""
  ); // Récupère les groupes via React Query
  const { data: projects = [], isLoading: isProjectsLoading } = useProjects(
    user?.id ?? "",
    groups
  ); // Récupère les projets via React Query
  const { updateProjects } = useUpdateQueryCache(); // Hook pour mettre à jour le cache local

  // Filtrer les projets selon le groupe sélectionné
  const filteredProjects =
    selectedGroup === -1
      ? projects
      : projects.filter((project) => project.groupInfo?.id === selectedGroup);

  // Gestion de session utilisateur
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        if (session && session.user) {
          setUser(session.user);
        } else {
          console.error("Failed to fetch session");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        window.location.href = "/";
      }
    };
    fetchSession();
  }, []);

  // Fonction pour ajouter un projet dupliqué localement
  const handleAddDuplicate = (duplicatedProject: any, baseId: number) => {
    const groupInfo = projects.find(
      (project) => project.id === baseId
    )?.groupInfo;
    const newProject = { ...duplicatedProject, groupInfo };
    updateProjects(user?.id ?? "", [newProject, ...projects]); // Met à jour le cache localement
  };

  // Fonction pour supprimer un projet localement
  const handleDeleteLocal = (deletedProjectId: number) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== deletedProjectId
    );
    updateProjects(user?.id ?? "", updatedProjects);
  };

  return (
    <div>
      <div className="flex flex-col items-start gap-2 mb-5">
        <h1 className="outfit-semibold tertiary-color text-xl lg:text-4xl">
          Vos projets d'aménagement
        </h1>
        <p className="outfit-regular text-md lg:text-lg tertiary-color">
          Vous avez actuellement {projects.length} projet(s).
        </p>
      </div>

      <div className="text-lg">
        {isGroupsLoading ? (
          <Loader />
        ) : (
          <Select
            labelPlacement="inside"
            label="Filtrer par groupe"
            size="md"
            color="secondary"
            radius="full"
            className="w-full lg:w-[30%] text-lg font-medium bg-white border-2 border-[#e54600] rounded-full !important outfit-regular"
            defaultOpen={false}
            onChange={(event: any) => {
              setSelectedGroup(Number(event.target.value));
            }}
          >
            <SelectSection title="Vos groupes" className="text-black">
              {groups.map((group) => (
                <SelectItem
                  key={group.id ?? "-2"}
                  value={group.id ?? "-3"}
                  className="text-black font-outfit text-xl"
                >
                  {group.name ?? "Aucun nom"}
                </SelectItem>
              ))}
            </SelectSection>
          </Select>
        )}
      </div>

      <Link
        href="/pages/projects/create"
        className="bg-secondary shadow-lg text-white py-3 px-[10%] rounded-full text-md outfit-regular flex items-center justify-center w-full lg:hidden mt-2 hover:bg-opacity-90 transition-all"
      >
        Créer mon projet
      </Link>

      <div
        className={`flex items-center gap-4 md:gap-8 mt-[5%] md:mt-[2%] flex-wrap ${
          isProjectsLoading ? "justify-center" : "justify-start"
        }`}
      >
        {isProjectsLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              ctaUpdate={handleAddDuplicate}
              ctaDelete={handleDeleteLocal}
            />
          ))
        ) : (
          <p>Vous n'avez pas de projets pour le moment.</p>
        )}
      </div>
    </div>
  );
}
