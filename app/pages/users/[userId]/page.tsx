"use client";

import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Title } from "../../../components/Title";
import { TitleType } from "../../../models/Title";
import { User } from "../../../models/User";

export default function Page({
  params: { userId },
}: {
  params: { userId: number };
}) {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState<TitleType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
          console.log("Utilisateurs:", data.data);
          setUser(data.data);
          setTitle({
            title: "Utilisateur",
            image: "/icons/close.svg",
            number: data.data.name || "",
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
    fetchData();
  }, []);

  if (isLoading || !user) {
    return <Loader />;
  }

  return (
    <div>
      <Title {...title} />
      <div className="py-[3%] flex flex-col items-center justify-center">
        <p className="flex-1 text-xl">
          Ici vous avez accès aux données de l'utilisateurs comme ses projets,
          les dernières activités, etc...
        </p>
        <div className="flex items-center justify-center gap-4 py-[2%]">
          <Loader />
          <p className="text-lg font-bold">En construction...</p>
          <Loader />
        </div>
      </div>
    </div>
  );
}
