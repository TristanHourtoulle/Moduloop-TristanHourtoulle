"use client";

import Loader from "@/components/Loader";
import { Title } from "@/components/Title";
import { getSession } from "@/lib/session";
import { TitleType } from "@/models/Title";
import { UserLine } from "@components/users/UserLine";
import { getUsers } from "@utils/database/user"; // Importez également la fonction updateUser
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [userSession, setUserSession] = useState(null);
  const [title, setTitle] = useState<TitleType>({
    title: "Utilisateurs",
    image: "/icons/admin.svg",
    number: "...",
    back: "/",
    canChange: false,
    id_project: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour mettre à jour les utilisateurs
  const updateUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
      setTitle({ ...title, number: res.length.toString() });
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const temp = await getSession();
      if (
        temp &&
        !temp.user.name.includes("undefined") &&
        temp.user.role === "admin"
      ) {
        setUserSession(temp);
        await updateUsers(); // Met à jour les utilisateurs au chargement de la page
        setIsLoading(false);
      } else {
        window.location.href = "/";
      }
    };
    fetchSession();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="h-full">
        {title && <Title {...title} />}
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
                      Dernière Activité
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  {Array.isArray(users) &&
                    users.map((user, index) => (
                      <UserLine key={index} user_id={(user as any).id} />
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
