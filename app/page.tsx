import { getSession } from "@lib/session";

export default async function Home() {

  const session = await getSession();
  const username = " " + session?.user?.name || '';
  const firstName = " " + session?.user?.firstName || '';
  const initials = firstName + " " + (username.substring(0, 2) || '');

  return (
    <div>
      <h1>Bonjour {initials}, Bienvenue sur l'outil Moduloop !</h1>
    </div>
  );
}
