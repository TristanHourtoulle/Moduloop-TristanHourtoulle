"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { Title } from "../../components/Title";
import { TitleType } from "../../models/Title";

export default function Page() {
  const [users, setUsers] = useState(null);
  const [title, setTitle] = useState<TitleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let res = await fetch("/api/user/list", {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          console.log("Utilisateurs:", data.data);
          setUsers(data.data);
          setTitle({
            title: "Utilisateurs",
            image: "/icons/admin.svg",
            number: data.data.length.toString(),
            back: "#",
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

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR"); // Format français : jour/mois/année
  };

  return (
    <div>
      {/* Loader */}
      {isLoading && <Loader />}

      {/* Content */}
      {!isLoading && (
        <div className="h-full">
          {/* Header */}
          <Title {...title} />

          {/* Content */}
          <div className="py-8 flex items-center justify-center">
            {users && users.length > 0 && (
              <div className="w-auto">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center overflow-x-auto shadow-md sm:rounded-lg mb-4"
                  >
                    <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Nom
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Prénom
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Rôle
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Dernières activités
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.name}
                          </td>
                          <td className="px-6 py-4">{user.firstName}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.role}</td>
                          <td className="px-6 py-4">
                            {formatDate(user.updatedAt)}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/pages/users/${user.id}`}
                              className="transition-all ease-in-out delay-50 text-white opacity-50 hover:opacity-100 flex items-center gap-2"
                            >
                              <Pencil />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
