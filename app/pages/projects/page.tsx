"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import { ProjectCard } from "@components/projects/ProjectCard";
import { getSession } from "@lib/session";
import { GroupType } from "@models/Group";
import { ProjectType } from "@models/Project";
import { TitleType } from "@models/Title";
import { Button } from "@nextui-org/button";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import {
  databaseToGroupModel,
  databaseToProjectModel,
  databaseToSeveralGroupModel,
} from "@utils/convert";
import { getGroupById, getGroupsByUserId } from "@utils/database/group";
import { getProjectsByUserId } from "@utils/database/project";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [backupProjects, setBackupProjects] = useState<ProjectType[] | null>(
    null
  );
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(-1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, getUserSession] = useState(null);

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
        const backupGroup = {
          id: -1,
          name: "Tous les groupes",
          description: "",
          budget: "0",
          user_id: Number(id_user),
          image: "",
        };
        groupData.push(backupGroup);
        await setGroups(groupData.reverse());
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
        setIsLoading(false);
      } else {
        // pas de projet créé
        setProjects([]);
        setBackupProjects([]);
        setIsLoading(false);
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
        const backupGroup = {
          id: -1,
          name: "Aucun Groupe",
          description: "",
          budget: "0",
          user_id: Number(id_user),
          image: "",
        };
        groupData.push(backupGroup);
        await setGroups(groupData.reverse());
      } else {
        // pas de groupe créé
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
          // pas de projet créé
          setProjects([]);
          setBackupProjects([]);
        }
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchSession();
    setIsLoading(false);
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
      <div className="flex flex-col lg:flex-row md:flex-row md:items-center justify-between lg:items-center mb-5">
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
      </div>

      <div className="text-lg">
        <Select
          items={groups}
          labelPlacement="inside"
          label="Filtrer par groupe"
          size="md"
          color="primary"
          className="w-full md:w-[50%] lg:w-[30%] font-medium"
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
                className="text-black font-outfit text-lg"
              >
                {group.name ?? "Aucun nom"}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
      </div>

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
