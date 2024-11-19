"use client";

import Loader from "@components/Loader";
import { ProjectCard } from "@components/projects/ProjectCard";
import { getSession } from "@lib/session";
import { GroupType } from "@models/Group";
import { ProjectType } from "@models/Project";
import { Button } from "@nextui-org/button";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import {
  databaseToProjectModel,
  databaseToSeveralGroupModel,
} from "@utils/convert";
import { getGroupsByUserId } from "@utils/database/group";
import { getProjectsByUserId } from "@utils/database/project";
import { useEffect, useState } from "react";

export default function Page() {
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [backupProjects, setBackupProjects] = useState<ProjectType[] | null>(
    null
  );
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(-1);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, getUserSession] = useState(null);

  // Filtrer les projets selon le groupe sélectionné
  const filteredProjects =
    selectedGroup === -1
      ? projects
      : projects
      ? projects.filter((project) => project.groupInfo?.id === selectedGroup)
      : null;

  const fetchGroupsAndProjects = async (userId: string) => {
    try {
      setIsLoading(true);

      // Récupération des groupes et projets en parallèle
      const [groupRes, projectRes] = await Promise.all([
        getGroupsByUserId(Number(userId)),
        getProjectsByUserId(Number(userId)),
      ]);

      // Traiter les groupes
      const groupData = groupRes
        ? databaseToSeveralGroupModel(groupRes).concat({
            id: -1,
            name: "Tous les groupes",
            description: "",
            budget: "0",
            user_id: Number(userId),
            image: "",
          })
        : [];

      // Traiter les projets et inclure les informations de groupe
      const projectsData = projectRes
        ? databaseToProjectModel(projectRes).map((project) => {
            const groupInfo = groupData.find(
              (group) => group.id === project.group
            ) || {
              id: -1,
              name: "Aucun Groupe",
              description: "",
              budget: "0",
              user_id: Number(userId),
              image: "",
            };
            return { ...project, groupInfo };
          })
        : [];

      // Mettre à jour les états
      setGroups(groupData.reverse());
      setProjects(projectsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const session = await getSession();

        if (session && session.user) {
          setUser(session.user);
          await fetchGroupsAndProjects(session.user.id);
        } else {
          console.error("Failed to fetch session");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        window.location.href = "/";
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  // // Fonction pour mettre à jour la liste des projets
  // const updateProjects = async () => {
  //   if (user) {
  //     await fetchGroupsAndProjects(user.id);
  //   }
  // };

  const handleDeleteLocal = (deletedProjectId: number) => {
    setProjects(
      (prevProjects) =>
        prevProjects?.filter((project) => project.id !== deletedProjectId) ??
        null
    );
  };

  const handleAddDuplicate = (duplicatedProject: any, baseId: number) => {
    console.log("duplicatedProject:", duplicatedProject);
    // Récupérer les informations groupInfo du projet original
    const groupInfo = projects?.find(
      (project) => project.id === baseId
    )?.groupInfo;

    // Remplacer groupInfo par le groupInfo du projet original
    duplicatedProject.groupInfo = groupInfo ?? null;
    console.log("duplicatedProject With groupInfo:", duplicatedProject);

    // Ajouter le projet dupliqué à la liste des projets et au début de la liste
    setProjects((prevProjects) =>
      prevProjects ? [duplicatedProject, ...prevProjects] : [duplicatedProject]
    );
  };

  return (
    <div>
      <div className="flex flex-col items-start gap-2 mb-5">
        <h1 className="outfit-semibold tertiary-color text-xl lg:text-4xl">
          Vos projets d'aménagement
        </h1>
        <p className="outfit-regular text-md lg:text-lg tertiary-color">
          Vous avez actuellement {projects ? projects.length.toString() : "0"}{" "}
          projet(s).
        </p>
      </div>
      {/* <div className="flex flex-col lg:flex-row md:flex-row md:items-center justify-between lg:items-center mb-5">
        <Title {...title} />
        <Button
          className="mt-5 md:mt-0 lg:mt-0 md:ml-0 lg:ml-0 w-full md:w-[30%] lg:w-[10%] text-lg rounded-lg"
          color="primary"
          size="lg"
          onClick={() => (window.location.href = "/pages/projects/create")}
          startContent={<Plus />}
          variant="solid"
        >
          Créer
        </Button>
      </div> */}

      <div className="text-lg">
        <Select
          items={groups}
          labelPlacement="inside"
          label="Filtrer par groupe"
          size="md"
          color="secondary"
          radius="full"
          className="w-full lg:w-[30%] text-lg font-medium bg-white border-2 border-[#e54600] rounded-full !important outfit-regular"
          defaultOpen={false}
          onChange={(event) => {
            setSelectedGroup(Number(event.target.value));
          }}
        >
          <SelectSection title={"Vos groupes"} className="text-black">
            {/* <SelectItem key={-1} value={-1}>
              Tous les groupes
            </SelectItem> */}
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
      </div>

      <Button
        color="secondary"
        variant="shadow"
        size="lg"
        className="flex lg:hidden text-md rounded-full w-full outfit-regular px-[10%] mt-2"
        onClick={() => {
          window.location.href = "/pages/projects/create";
        }}
      >
        Créer mon projet
      </Button>

      <div
        className={`flex items-center gap-4 md:gap-8 mt-[5%] md:mt-[2%] flex-wrap ${
          isLoading ? "justify-center" : "justify-start"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : projects && projects.length > 0 ? (
          projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                project={project}
                ctaUpdate={handleAddDuplicate}
                ctaDelete={handleDeleteLocal}
              />
            );
          })
        ) : (
          <p>Vous n'avez pas de projets pour le moment.</p>
        )}
      </div>
    </div>
  );
}
