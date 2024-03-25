"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import { getSession } from "@lib/session";
import { GroupType } from "@models/Group";
import { ProjectType } from "@models/Project";
import { TitleType } from "@models/Title";
import { databaseToGroupModel, databaseToProjectModel } from "@utils/convert";
import dateFormater from "@utils/dateFormater";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [projects, setProjects] = useState<ProjectType | null>(null);
  const [group, setGroup] = useState<GroupType | null>(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, getUserSession] = useState(null);

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
    const fetchData = async () => {
      setIsLoading(true);
      // Get User Session
      let res = await fetch("/api/session", {
        method: "GET",
      });
      const session = await res.json();
      if (!session.success) {
        console.error("Failed to fetch session:", session.error);
        alert(session.error);
      } else {
        await setUser(session.session.user);
        // Get Projects
        // Get Projects
        res = await fetch(
          `/api/project/list?id=${encodeURIComponent(session.session.user.id)}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (data.success) {
          let projectsData = databaseToProjectModel(data.data);
          for (let i = 0; i < projectsData.length; i++) {
            // Get Group By Id
            res = await fetch(
              `/api/group/id?id=${encodeURIComponent(projectsData[i].group)}`,
              {
                method: "GET",
              }
            );
            const groupData = await res.json();
            if (groupData.success) {
              const groupInfo = databaseToGroupModel(groupData.data);
              if (groupInfo.id) {
                projectsData[i].groupInfo = groupInfo;
              } else {
                console.log("Invalid group data:", groupInfo);
              }
            } else {
              console.error("Failed to fetch groups:", groupData.error);
            }
          }
          await setProjects(projectsData);
        } else {
          console.error("Failed to fetch projects:", data.error);
        }
      }
      setIsLoading(false);
    };

    fetchSession();
  }, []);

  const title: TitleType = {
    title: "Vos projets",
    image: "/icons/but.svg",
    number: projects ? projects.length.toString() : "0",
    back: "#",
    canChange: false,
  };

  const handleDeleteProject = async (id: number) => {
    if (
      window.confirm(
        "Voulez-vous vraiment supprimer ce projet ?\n Cet action est irréversible."
      )
    ) {
      setIsLoading(true);
      let res = await fetch(`/api/project?id_project=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIsLoading(false);
        window.location.reload();
      } else {
        setIsLoading(false);
        alert("FAILED");
      }
    } else {
      console.log("Project not deleted.");
    }
  };

  const handleDuplicateProject = async (id: number) => {
    setIsLoading(true);
    let res = await fetch(`/api/project/duplicate?id_project=${id}`, {
      method: "POST",
    });
    if (res.ok) {
      setIsLoading(false);
      window.location.reload();
    } else {
      setIsLoading(false);
      console.log("Error while duplicating project: ", res);
      alert("FAILED");
    }
  };

  return (
    <div>
      {/* Afficher le Loader si isLoading est true */}
      {isLoading && <Loader />}

      {/* Header et Projects */}
      {!isLoading && (
        <>
          <div className="flex items-center mb-10">
            <Title {...title} />
            <Link
              href="/pages/projects/create"
              className="create-project-button create-project-btn"
            >
              <div className="flex gap-2">
                <Image
                  src="/icons/plus-blanc.svg"
                  alt="Créer un projet"
                  width={20}
                  height={20}
                />
                Créer un projet
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10 flex-wrap ml-10 projects-container">
            {projects ? (
              projects.map((project, index) => {
                const group = project.groupInfo;
                const showProjectUrl = "/pages/projects/" + project.id;
                return (
                  <div
                    key={index}
                    className="flex flex-col project-card gap-2 project-zoom"
                  >
                    <p className="group text-in-single-line">
                      {group ? group.name : "Aucun Groupe"}
                    </p>
                    <p className="name text-in-single-line">{project.name}</p>
                    <p className="description text-in-single-line">
                      {project.description
                        ? project.description
                        : "Aucune description"}
                    </p>
                    <div className="flex">
                      <p className="date mr-auto">Dernières modifications:</p>
                      <p className="date mr-5">
                        {dateFormater(project.updated_at).date} à{" "}
                        {dateFormater(project.updated_at).time}
                      </p>
                    </div>
                    <div className="line"></div>
                    <div className="flex justify-center items-center gap-5">
                      <div
                        className="flex items-center gap-2 delete-btn cursor-pointer"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Image
                          src="/icons/trash-can.svg"
                          alt="Supprimer le projet"
                          width={30}
                          height={30}
                        />
                      </div>
                      <div
                        onClick={() => {
                          handleDuplicateProject(project.id);
                        }}
                        className="flex items-center open-btn cursor-pointer"
                      >
                        <p className="">Dupliquer</p>
                      </div>
                      <Link href={showProjectUrl}>
                        <div className="flex items-center open-btn">
                          <p className="">Ouvrir</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Vous n'avez pas de projets pour le moment.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
