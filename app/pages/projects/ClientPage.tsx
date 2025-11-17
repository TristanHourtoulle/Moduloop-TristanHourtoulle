"use client";

import { ProjectCard } from "@components/projects/ProjectCard";
import {
  useGroups,
  useProjects,
  useUpdateQueryCache,
} from "@hooks/useGroupsAndProjects";
import { Select } from "@/components/ui-compat/select";
import Link from "next/link";
import { useState } from "react";

export default function ClientPage({ user }: { user: { id: string } }) {
  const [selectedGroup, setSelectedGroup] = useState<number>(-1);

  // Utilisation des données avec React Query
  const { data: groups = [], isLoading: isGroupsLoading } = useGroups(user.id);
  const { data: projects = [], isLoading: isProjectsLoading } = useProjects(
    user.id,
    groups
  );
  const { updateProjects } = useUpdateQueryCache();

  // Filtrer les projets selon le groupe sélectionné
  const filteredProjects =
    selectedGroup === -1
      ? projects
      : projects.filter((project) => project.groupInfo?.id === selectedGroup);

  // Fonction pour ajouter un projet dupliqué
  const handleAddDuplicate = (duplicatedProject: any, baseId: number) => {
    const groupInfo = projects.find(
      (project) => project.id === baseId
    )?.groupInfo;
    const newProject = { ...duplicatedProject, groupInfo };
    updateProjects(user.id, [newProject, ...projects]);
  };

  // Fonction pour supprimer un projet localement
  const handleDeleteLocal = (deletedProjectId: number) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== deletedProjectId
    );
    updateProjects(user.id, updatedProjects);
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
          <p>Chargement des groupes...</p>
        ) : (
          <Select
            label="Filtrer par groupe"
            size="md"
            color="secondary"
            className="w-full lg:w-[30%] text-lg font-medium bg-white border-2 border-[#e54600] rounded-full !important outfit-regular"
            onChange={(event: any) => {
              setSelectedGroup(Number(event.target.value));
            }}
          >
            
              {groups.map((group) => (
                <option
                  key={group.id ?? "-2"}
                  value={group.id ?? "-3"}
                  className="text-black font-outfit text-xl"
                >
                  {group.name ?? "Aucun nom"}
                </option>
              ))}
            
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
          <p>Chargement des projets...</p>
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
