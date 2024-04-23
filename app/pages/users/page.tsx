"use client";

import Loader from "@/components/Loader";
import { Title } from "@/components/Title";
import { getSession } from "@/lib/session";
import { TitleType } from "@/models/Title";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [userSession, getUserSession] = useState(null);
  const [title, setTitle] = useState<TitleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        let res = await fetch("/api/user/list", {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          const userData = data.data || []; // Assurez-vous que userData est un tableau
          setUsers(userData);
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
    fetchSession();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString: any) => {
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
          {title && <Title {...title} />}

          {/* Content */}
          <div className="py-8 flex items-center justify-center">
            {users && Array.isArray(users) && users[0] && (
              <div className="w-auto">
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
                        Date de création
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    {Array.isArray(users) &&
                      users.map((user, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {(user as any).name}
                          </td>
                          <td className="px-6 py-4">
                            {(user as any).firstName}
                          </td>
                          <td className="px-6 py-4">{(user as any).email}</td>
                          <td className="px-6 py-4">{(user as any).role}</td>
                          <td className="px-6 py-4">
                            {formatDate((user as any).updatedAt)}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/pages/users/${(user as any).id}`}
                              className="transition-all ease-in-out delay-50 text-white opacity-50 hover:opacity-100 flex items-center gap-2"
                            >
                              <Pencil />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
