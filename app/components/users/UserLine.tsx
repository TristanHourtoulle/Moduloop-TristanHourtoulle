import { getProjectsByUserId } from "@utils/database/project";
import { getUserById } from "@utils/database/user";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type UserLineProps = {
  user_id: string;
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  return `${day}/${month}/${d.getFullYear()}`;
};

const getLastActivity = (date: string | null, userCreatedAt: string) => {
  let d: Date;

  if (date === null) {
    d = new Date(userCreatedAt);
  } else {
    d = new Date(date);
  }

  const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

  return `${day}/${month}/${year} à ${hours}:${minutes}`;
};

export const UserLine = (props: UserLineProps) => {
  const [user, setUser] = useState<null | any>(null);
  const [projects, setProjects] = useState<null | any[]>(null);
  const { user_id } = props;

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserById(Number(user_id));
      if (userData) {
        setUser(userData);
        const projectsData = await getProjectsByUserId(Number(user_id));
        if (projectsData) {
          setProjects(projectsData);
        } else {
          // Pas de projets
        }
      } else {
        console.error("L'utilisateur n'a pas été trouvé avec l'id:", user_id);
      }
    };
    fetchData();
  }, [user_id]);

  if (user === null) {
    return null;
  }

  return (
    <tr>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {user.name}
      </td>
      <td className="px-6 py-4">{user.firstName}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
      <td className="px-6 py-4">
        {projects &&
          projects[0] &&
          getLastActivity(projects[0].updated_at || null, user.createdAt)}
        {!projects && formatDate(user.createdAt)}
      </td>
      <td className="px-6 py-4">
        <Link
          href={`/pages/users/${user.id}`}
          className="transition-all ease-in-out delay-50 text-black opacity-50 hover:opacity-100 flex items-center gap-2"
        >
          <Pencil />
        </Link>
      </td>
    </tr>
  );
};
