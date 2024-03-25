"use client";

import Loader from "@/components/Loader";
import { Title } from "@/components/Title";
import { getSession } from "@/lib/session";
import { TitleType } from "@/models/Title";
import { User } from "@/models/User";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchSession = async () => {
      const temp = await getSession();

      if (
        temp &&
        !temp.user.name.includes("undefined") &&
        temp.user.role === "admin"
      ) {
        getUserSession(temp);
        fetchData();
        return;
      }
      window.location.href = "/";
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let res = await fetch(
          `/api/user/admin?id=${encodeURIComponent(userId)}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
          console.log(data);
          setTitle({
            title: "Utilisateur",
            image: "/icons/close.svg",
            number: data.data.name + " " + data.data.firstName || "",
            back: "/pages/users",
            canChange: false,
            id_project: undefined,
          });
        } else {
          console.error(
            "Erreur lors de la récupération des utilisateurs:",
            data.error
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
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
      return days + 1 + " jours";
    } else if (hours > 0) {
      return hours + " heures";
    } else if (minutes > 0) {
      return minutes + " minutes";
    } else {
      return seconds + " secondes";
    }
  };

  if (isLoading || !user) {
    return <Loader />;
  }

  return (
    <div className="">
      <Title {...title} />
      <div className="py-[3%] px-7 flex flex-col items-center">
        {/* <p className="flex-1 text-xl">
          Ici vous avez accès aux données de l'utilisateurs comme ses projets,
          les dernières activités, etc...
        </p>
        <div className="flex items-center justify-center gap-4 py-[2%]">
          <Loader />
          <p className="text-lg font-bold">En construction...</p>
          <Loader />
        </div> */}

        {/* View Content */}
        {/* Infos View */}
        {selectedView === "infos" && (
          <div className="flex flex-col w-[50%]">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl align-left font-semibold leading-7 text-gray-900">
                Informations
              </h3>
            </div>

            <div className="mt-6 border-t border-gray-300">
              <dl className="divide-y divide-gray-300">
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
                    Addresse Mail
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0">
                    {user.email || ""}
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
                    Projets
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-900 sm-col-span-2 sm:mt-0">
                    <Link
                      href="#"
                      className="flex items-center gap-4 w-[90%] bg-white text-[#30c1bd] border-2 border-[#30c1bd] rounded-md px-4 py-2 hover:bg-[#30c1bd] hover:text-white transition-all ease-in-out delay-50"
                    >
                      <Eye />
                      <span>Voir les projets</span>
                    </Link>
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
