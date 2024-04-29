"use client";

import Loader from "@/components/Loader";
import { Title } from "@/components/Title";
import { getSession } from "@/lib/session";
import { TitleType } from "@/models/Title";
import { User } from "@/models/User";
import { ProjectType } from "@models/Project";
import { getProjectsByUserId } from "@utils/database/project";
import { getUserById, updateUser } from "@utils/database/user";
import { Copy, ExternalLink, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page({
  params: { userId },
}: {
  params: { userId: number };
}) {
  const [user, setUser] = useState<User | null>(null);
  const [userSession, getUserSession] = useState(null);
  const [title, setTitle] = useState<TitleType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedView, setSelectedView] = useState("infos");
  const [isCopied, setIsCopied] = useState(false);
  const [emailHeight, setEmailHeight] = useState("auto");
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [viewProjects, setViewProjects] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("user");
  const [userRole, setUserRole] = useState<string>("user");
  const [changeRole, setChangeRole] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      const temp = await getSession();

      if (
        temp &&
        !temp.user.name.includes("undefined") &&
        temp.user.role === "admin"
      ) {
        getUserSession(temp);
        await fetchData();
        await fetchProjects();
        return;
      }
      window.location.href = "/";
    };

    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        let data = await getProjectsByUserId(userId);
        if (data) {
          setProjects(data);
        } else {
          console.error(
            "Cette utilisateur n'a pas de projets ou n'existe pas."
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des projets de l'utilisateur:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data = await getUserById(userId);
        if (data) {
          setUser(data);
          setSelectedRole(data.role);
          setUserRole(data.role);
          setTitle({
            title: "Utilisateur",
            image: "/icons/close.svg",
            number: data.name + " " + data.firstName || "",
            back: "/pages/users",
            canChange: false,
            id_project: undefined,
          });
        } else {
          console.error(
            "Cet utilisateur n'existe pas ou n'est pas un administrateur."
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, []);

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const getElapsedTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      return days + " jours";
    } else if (hours > 0) {
      return hours + " heures";
    } else if (minutes > 0) {
      return minutes + " minutes";
    } else {
      return seconds + " secondes";
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setEmailHeight("auto"); // Réinitialise la hauteur de la div de l'email pour déclencher l'animation
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la copie dans le presse-papiers : ", error);
    }
  };

  if (isLoading || !user || !title || !projects) {
    return <Loader />;
  }

  const handleSelectedRoleChange = async (selectedOption: string) => {
    if (selectedOption !== userRole) {
      setChangeRole(true);
    } else if (changeRole) {
      setChangeRole(false);
    }
  };

  const handleSetNewRole = async () => {
    if (user && changeRole) {
      const newUser = {
        ...user,
        role: selectedRole,
        updatedAt: "",
        createdAt: "",
      };
      try {
        let res = await updateUser(user);
        const data = await res;
        if (data) {
          setSelectedRole(selectedRole);
          setUserRole(selectedRole);
          setChangeRole(false);
          toast.success("Le rôle de l'utilisateur a été modifié avec succès !");
        } else {
          console.error(
            "Erreur lors de la modification du rôle de l'utilisateur:",
            data.error
          );
          toast.error(
            "Erreur 1 lors de la modification du rôle de l'utilisateur"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la modification du rôle de l'utilisateur:",
          error
        );
        toast.error(
          "Erreur 2 lors de la modification du rôle de l'utilisateur"
        );
      }
    }
  };

  return (
    <div className="">
      <Title {...title} />
      <div className="py-[3%] px-7 flex flex-col items-center">
        {/* Ici vous avez accès aux données de l'utilisateur comme ses projets,
            les dernières activités, etc... */}
        {/* <div className="flex items-center justify-center gap-4 py-[2%]">
             <Loader />
             <p className="text-lg font-bold">En construction...</p>
             <Loader />
           </div> */}

        {/* View Content */}
        {/* Infos View */}
        {selectedView === "infos" && (
          <div className="flex flex-col w-[75%]">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl align-left font-semibold leading-7 text-gray-900">
                Informations
              </h3>
            </div>

            <div className="mt-6 border-t border-gray-300">
              <dl className="divide-y divide-gray-300">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-500">
                    Rôle
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0">
                    <div className="flex gap-3 items-center justify-between">
                      <select
                        onChange={() => {
                          const selectedOption = document.getElementById(
                            "role"
                          ) as HTMLSelectElement;
                          setSelectedRole(selectedOption.value);
                          handleSelectedRoleChange(selectedOption.value);
                        }}
                        id="role"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 "
                      >
                        <option
                          value="admin"
                          selected={selectedRole === "admin"}
                        >
                          Administrateur
                        </option>
                        <option
                          value="user"
                          selected={selectedRole !== "admin"}
                        >
                          Utilisateur
                        </option>
                      </select>

                      <div
                        hidden={!changeRole}
                        onClick={handleSetNewRole}
                        className="cursor-pointer border-2 border-[#30C1BD] bg-white text-[#30C1BD] rounded-md px-4 py-2 hover:bg-[#30C1BD] hover:text-white transition-all ease-in-out delay-50"
                      >
                        Confirmer
                      </div>
                    </div>
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-500">
                    Nom & Prénom
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0">
                    {user.name + " " + user.firstName}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-500">
                    Adresse Mail
                  </dt>
                  <dd
                    className={`mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0 transition-all duration-100 ease-in-out overflow-hidden hover:opacity-75`}
                    style={{ height: emailHeight }}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => {
                        handleCopyToClipboard(user.email || "");
                      }}
                    >
                      {user.email || ""}
                      <Copy className="transition-rotate duration-300 rotate-0 hover:rotate-[8deg]" />
                    </div>
                    {isCopied && (
                      <p className="mt-2 text-sm font-semibold text-[#30c1bd]">
                        Texte copié avec succès !
                      </p>
                    )}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-500">
                    Membre depuis
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0">
                    {formatDate(user.updatedAt || "")}{" "}
                    <span className="text-gray-500">
                      ({getElapsedTime(user.updatedAt || "")})
                    </span>
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-500">
                    Dernières Activités
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0">
                    {projects && projects[0]
                      ? formatDate(projects[0].updated_at || "")
                      : "Néant"}{" "}
                    <span className="text-gray-500">
                      (
                      {projects && projects[0]
                        ? getElapsedTime(projects[0].updated_at || "")
                        : "Néant"}
                      )
                    </span>
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-gray-500">
                    Projets
                  </dt>
                  <dd
                    className="mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0"
                    onClick={() => {
                      setViewProjects(!viewProjects);
                    }}
                  >
                    <Link
                      href="#"
                      className="flex items-center gap-4 w-fit bg-white text-[#30c1bd] border-2 border-[#30c1bd] rounded-md px-4 py-2 hover:bg-[#30c1bd] hover:text-white transition-all ease-in-out delay-50"
                    >
                      {viewProjects ? <EyeOff /> : <Eye />}
                      {viewProjects ? (
                        <span>Masquer les projets</span>
                      ) : (
                        <span>Voir les projets</span>
                      )}
                    </Link>

                    <div className="flex flex-col items-start w-[250%] mt-5">
                      {viewProjects && projects.length > 0 ? (
                        projects.map((project) => (
                          <div className="flex items-center justify-between gap-12 border-t-2 py-4 border-gray-300">
                            <div className="flex flex-col items-start">
                              <p className="text-lg font-semibold">
                                {project.name}
                              </p>
                              <p className="text-lg">
                                Dernière modification:{" "}
                                {formatDate(project.updated_at || "")}{" "}
                                <span>
                                  {getElapsedTime(project.updated_at || "")}
                                </span>
                              </p>
                            </div>
                            <div className="flex flex-col items-center bg-white border-2 border-black px-4 py-2 rounded-[8px]">
                              <Link
                                href={`/pages/projects/${project.id}`}
                                className="flex items-center justify-center gap-3 w-fit"
                              >
                                <ExternalLink />
                                <p className="text-lg font-semibold">Ouvrir</p>
                              </Link>
                            </div>
                          </div>
                        )) || <div className="mt-">Il n'y a pas de projets</div>
                      ) : viewProjects ? (
                        <p>L'utilisateur n'a pas encore créé de projets...</p>
                      ) : null}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
