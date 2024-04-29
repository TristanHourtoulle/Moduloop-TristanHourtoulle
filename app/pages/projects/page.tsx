"use client";

import { Title } from "@components/Title";
import { Button } from "@components/button/Button";
import { ProjectCard } from "@components/projects/ProjectCard";
import { getSession } from "@lib/session";
import { GroupType } from "@models/Group";
import { ProjectType } from "@models/Project";
import { TitleType } from "@models/Title";
import {
  databaseToGroupModel,
  databaseToProjectModel,
  databaseToSeveralGroupModel,
} from "@utils/convert";
import { getGroupById, getGroupsByUserId } from "@utils/database/group";
import { getProjectsByUserId } from "@utils/database/project";
import { useEffect, useState } from "react";

export default function page() {
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [backupProjects, setBackupProjects] = useState<ProjectType[] | null>(
    null
  );
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(-1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, getUserSession] = useState(null);

  // const dialogProps: DialogsProps = {
  //   title: "Supprimer ce produit du projet",
  //   content:
  //     "Êtes-vous sûr de vouloir supprimer ce produit du projet ? Cette action est irréversible.",
  //   validate: "Confirmer",
  //   cancel: "Annuler",
  //   cta: () => confirmDeleteProduct(),
  //   cancelCta: () => setDialogOpen(false),
  // };

  useEffect(() => {
    if (backupProjects !== null) {
      setProjects(filterProjects());
    }
  }, [selectedGroup, backupProjects]);

  const updateProjects = async () => {
    const fetchGroup = async (id_user: string) => {
      let res = await getGroupsByUserId(Number(id_user));
      if (res) {
        let groupData = databaseToSeveralGroupModel(res);
        await setGroups(groupData);
      } else {
        console.error("Failed to fetch groups:", res.error);
      }
    };

    setIsLoading(true);
    // Get User Session
    let res = await getSession();
    const session = await res;
    if (!session) {
      console.error("Failed to fetch session:", session.error);
      alert(session.error);
    } else {
      await setUser(session.user);
      await fetchGroup(session.user.id);
      // Get Projects
      res = await getProjectsByUserId(session.user.id);
      const data = await res;
      if (data) {
        let projectsData = databaseToProjectModel(data);
        for (let i = 0; i < projectsData.length; i++) {
          // Get Group By Id
          if (
            projectsData === null ||
            projectsData[i] === null ||
            projectsData[i].group === null
          ) {
            break;
          }
          res = getGroupById(projectsData[i].group ?? 0);
          const groupData = await res;
          if (groupData) {
            const groupInfo = databaseToGroupModel(groupData);
            if (groupInfo && groupInfo.id) {
              projectsData[i].groupInfo = groupInfo;
            } else {
              const tempGroupInfo: GroupType = {
                id: -1,
                name: "Aucun Groupe",
                description: "",
                budget: "0",
                user_id: session.user.id,
                image: "",
              };
              projectsData[i].groupInfo = tempGroupInfo;
            }
          } else {
            console.error("Failed to fetch groups:", groupData.error);
          }
        }
        setProjects(projectsData);
        setBackupProjects(projectsData); // Sauvegarder les projets initiaux
      } else {
        console.error("Failed to fetch projects:", data.error);
      }
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const temp = await getSession();

      if (temp && !temp.user.name.includes("undefined")) {
        getUserSession(temp);
        fetchData();
        return;
      }
      window.location.href = "/";
    };

    const fetchGroup = async (id_user: string) => {
      let res = await getGroupsByUserId(Number(id_user));
      const data = await res;
      if (data) {
        let groupData = databaseToSeveralGroupModel(data);
        await setGroups(groupData);
      } else {
        console.error("Failed to fetch groups:", data.error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      // Get User Session
      let res = await getSession();
      const session = await res;
      if (!session) {
        console.error("Failed to fetch session:", session.error);
        alert(session.error);
      } else {
        await setUser(session.user);
        await fetchGroup(session.user.id);
        // Get Projects
        res = await getProjectsByUserId(session.user.id);
        const data = await res;
        if (data) {
          let projectsData = databaseToProjectModel(data);
          for (let i = 0; i < projectsData.length; i++) {
            // Get Group By Id
            if (
              projectsData === null ||
              projectsData[i] === null ||
              projectsData[i].group === null
            ) {
              break;
            }
            res = await getGroupById(projectsData[i].group ?? 0);
            const groupData = await res;
            if (groupData) {
              const groupInfo = databaseToGroupModel(groupData);
              if (groupInfo && groupInfo.id) {
                projectsData[i].groupInfo = groupInfo;
              } else {
                const tempGroupInfo: GroupType = {
                  id: -1,
                  name: "Aucun Groupe",
                  description: "",
                  budget: "0",
                  user_id: session.user.id,
                  image: "",
                };
                projectsData[i].groupInfo = tempGroupInfo;
              }
            } else {
              console.error("Failed to fetch groups:", groupData.error);
            }
          }
          setProjects(projectsData);
          setBackupProjects(projectsData); // Sauvegarder les projets initiaux
        } else {
          // console.error("Failed to fetch projects:", data.error);
          setProjects([]);
          setBackupProjects([]);
        }
      }
      setIsLoading(false);
    };

    fetchSession();
  }, []);

  const filterProjects = () => {
    if (backupProjects === null) return [];
    if (selectedGroup === -1) {
      return backupProjects;
    } else {
      const tempProjects: ProjectType[] = [];
      for (let i = 0; i < backupProjects.length; i++) {
        if (
          backupProjects &&
          backupProjects[i] &&
          backupProjects[i].groupInfo &&
          backupProjects[i].groupInfo?.id === selectedGroup
        ) {
          tempProjects.push(backupProjects[i]);
        }
      }
      return tempProjects;
    }
  };

  const title: TitleType = {
    title: "Vos projets",
    image: "/icons/but.svg",
    number: projects ? projects.length.toString() : "0",
    back: "#",
    canChange: false,
    id_project: undefined,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Title {...title} />
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/pages/projects/create")}
          content="Créer un projet"
          image={"/icons/plus-blanc.svg"}
          size="large"
          disabled={false}
          moreClasses="mr-5"
        />
      </div>

      <div className="ml-[6%] flex gap-5 items-center w-[40%]">
        <label hidden htmlFor="selectedGroup" className="text-lg font-medium">
          Filtrer par groupe
        </label>
        <select
          onChange={(event) => {
            setSelectedGroup(parseInt(event.target.value));
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[65%] p-2.5 "
        >
          <option className="" value={-1}>
            Tous les groupes
          </option>

          {groups.length > 0 &&
            groups.map((group, index) => (
              <option key={index} value={group.id || -10}>
                {group.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex items-center justify-center gap-4 mt-[2%] flex-wrap ml-10 projects-container">
        {projects && projects.length > 0 ? (
          projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                project={project}
                ctaUpdate={updateProjects}
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
